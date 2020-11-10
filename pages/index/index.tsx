import React, { FC, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../stores';
import { success } from '../../stores/alert/actions';
import { useSelector, useDispatch } from 'react-redux';
import getConfig from 'next/config';
import { login } from '../../stores/auth/actions';
import { fetchInıtData } from '../../stores/locations/actions';
import IPageConfig from '../../interfaces/PageConfig';
import './index.scss';
import LocationList from '../../components/locationList';
import { load } from 'dotenv/types';
import Loading from '../../components/loading/loading';
import Header from '../../components/header';
import ReturnToTop from '../../components/returnToTop';

const { publicRuntimeConfig } = getConfig();

import LocationListQuery from '../../interfaces/locationListQuery';
type IProps = {} & LocationListQuery;

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

const Home: INextPage<IProps> = ({ page, sortby, lat, lng }) => {
  const { news, auth } = useSelector((state: RootState) => state);
  console.log(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      //dispatch(fetchInıtData());
    }, 1250);
  }, []);

  const {
    locations: { loading, filteredData },
  } = useSelector((state: RootState) => state);

  return (
    <div className="home-page">
      <ReturnToTop />
      <div className="content">
        <div className="home-location-list">
          {loading ? (
            <div className="home-location-list--loading">
              <Loading />
            </div>
          ) : (
            filteredData && <LocationList page={page} sortby={sortby} lat={lat} lng={lng} />
          )}
        </div>
      </div>
    </div>
  );
};

Home.pageConfig = {
  auth: true,
  footer: false,
};

function isNumeric(x: any) {
  return parseFloat(x).toString() === x.toString();
}
Home.getInitialProps = async ({ store, pathname, query }: NextPageContext): Promise<IProps> => {
  const { page, sortby, lat, lng } = query;
  let pageQuery = 1,
    sortByQuery: 'abc' | 'last' | 'nearby' | undefined,
    latQuery,
    lngQuery;

  if (page && isNumeric(page.toString())) {
    pageQuery = parseInt(page.toString());
  }
  console.log(pageQuery);

  if (sortby) {
    let temp = sortby.toString();
    if (temp === 'abc' || temp === 'last' || temp === 'nearby') {
      sortByQuery = temp;
    }
  }
  if (lat && isNumeric(lat.toString())) {
    latQuery = parseFloat(lat.toString());
  }
  if (lng && isNumeric(lng.toString())) {
    lngQuery = parseFloat(lng.toString());
  }
  await store.dispatch(
    fetchInıtData({ page: pageQuery, sortby: sortByQuery, lat: latQuery, lng: lngQuery }) as any,
  );

  return { page: pageQuery, sortby: sortByQuery, lat: latQuery, lng: lngQuery };
};

//export default connect(Home);

/*
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  console.log('2. Page.getServerSideProps uses the store to dispatch things');
  await store.dispatch(login({ email: 'email', password: 'password' }) as any);
  //await store.dispatch(fetchInıtData() as any);
  return { props: { custom: 'alptekin' } };
});*/

export default Home;
