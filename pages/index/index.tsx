import React, { FC, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../stores';
import { success } from '../../stores/alert/actions';
import { useSelector, useDispatch } from 'react-redux';
import getConfig from 'next/config';
import { login } from '../../stores/auth/actions';
import {
  clearFilterBySearchVal,
  fetchCategories,
  fetchInıtData,
} from '../../stores/locations/actions';
import IPageConfig from '../../interfaces/PageConfig';
import './index.scss';
import LocationList from '../../components/locationList';
import { load } from 'dotenv/types';
import Loading from '../../components/loading/loading';
import Header from '../../components/header';
import ReturnToTop from '../../components/returnToTop';

const { publicRuntimeConfig } = getConfig();

import ILocationListQuery from '../../interfaces/locationListQuery';
type IProps = {
  query: ILocationListQuery;
};

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

const Home: INextPage<IProps> = ({ query }) => {
  const { page, sortby, lat, lng, category, category_id, search } = query;
  const { news, auth } = useSelector((state: RootState) => state);
  //console.log(auth);
  const dispatch = useDispatch();

  const {
    locations: { loading },
  } = useSelector((state: RootState) => state);

  return (
    <div className="home-page">
      <ReturnToTop />
      <div className="content">
        <div className="home-location-list">
          {/*loading && (
            <div className="home-location-list--loading">
              <Loading />
            </div>
          )*/}
          <LocationList query={query} />
        </div>
      </div>
    </div>
  );
};

Home.pageConfig = {
  auth: true,
  footer: false,
  header_algolia: true,
};

function isNumeric(x: any) {
  return parseFloat(x).toString() === x.toString();
}

/*
Home.getInitialProps = async ({ store, pathname, query }: NextPageContext): Promise<IProps> => {
  const { page, sortby, lat, lng, category, search } = query;
  let pageQuery = 1,
    sortByQuery: 'abc' | 'last' | 'near' | undefined,
    latQuery,
    lngQuery,
    categoryObj,
    searchQuery;

  if (page && isNumeric(page.toString())) {
    pageQuery = parseInt(page.toString());
  }

  if (sortby) {
    let temp = sortby.toString();
    if (temp === 'abc' || temp === 'last' || temp === 'near') {
      sortByQuery = temp;
    }
  }
  if (lat && isNumeric(lat.toString())) {
    latQuery = parseFloat(lat.toString());
  }
  if (lng && isNumeric(lng.toString())) {
    lngQuery = parseFloat(lng.toString());
  }
  await store.dispatch(fetchCategories() as any);
  if (category) {
    let catStr = category.toString();
    const { locations } = store.getState() as RootState;
    const { categories } = locations;
    categoryObj = categories.categories.find(
      (cat: any) => cat.name.toLowerCase() === catStr.toLowerCase(),
    );
  }
  console.log(categoryObj);

  await store.dispatch(
    fetchInıtData({
      page: pageQuery,
      sortby: sortByQuery,
      lat: latQuery,
      lng: lngQuery,
      category: categoryObj?.id,
      search: search?.toString(),
    }) as any,
  );

  return {
    query: {
      page: pageQuery,
      sortby: sortByQuery,
      lat: latQuery,
      lng: lngQuery,
      category: categoryObj?.name.toLowerCase(),
      category_id: categoryObj?.id,
      search: search?.toString(),
    },
  };
}; */

//export default connect(Home);
/*
export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { page, sortby, lat, lng, category, search } = query;
  let pageQuery = 1,
    sortByQuery: 'abc' | 'last' | 'near' | undefined,
    latQuery,
    lngQuery,
    categoryObj,
    searchQuery;

  if (page && isNumeric(page.toString())) {
    pageQuery = parseInt(page.toString());
  }

  if (sortby) {
    let temp = sortby.toString();
    if (temp === 'abc' || temp === 'last' || temp === 'near') {
      sortByQuery = temp;
    }
  }
  if (lat && isNumeric(lat.toString())) {
    latQuery = parseFloat(lat.toString());
  }
  if (lng && isNumeric(lng.toString())) {
    lngQuery = parseFloat(lng.toString());
  }
  if (category) {
    let catStr = category.toString();
    const { locations } = store.getState() as RootState;
    const { categories } = locations;
    categoryObj = categories.categories.find(
      (cat: any) => cat.name.toLowerCase() === catStr.toLowerCase(),
    );
  }
  await store.dispatch(fetchCategories() as any);

  await store.dispatch(
    fetchInıtData(
      JSON.parse(
        JSON.stringify({
          page: pageQuery,
          sortby: sortByQuery,
          lat: latQuery,
          lng: lngQuery,
          category: categoryObj?.id,
          search: search?.toString(),
        }),
      ),
    ) as any,
  );

  return {
    props: {
      query: JSON.parse(
        JSON.stringify({
          page: pageQuery,
          sortby: sortByQuery,
          lat: latQuery,
          lng: lngQuery,
          category: categoryObj?.name.toLowerCase(),
          category_id: categoryObj?.id,
          search: search?.toString(),
        }),
      ),
    },
  };
});

*/

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
  let page, sortby, lat, lng, category, search;
  if (params) {
    page = params.page;
    sortby = params.sortby;
    lat = params.lat;
    lng = params.lng;
    category = params.category;
    search = params.search;
  }
  let pageQuery = 1,
    sortByQuery: 'abc' | 'last' | 'near' | undefined,
    latQuery,
    lngQuery,
    categoryObj,
    searchQuery;

  if (page && isNumeric(page.toString())) {
    pageQuery = parseInt(page.toString());
  }

  if (sortby) {
    let temp = sortby.toString();
    if (temp === 'abc' || temp === 'last' || temp === 'near') {
      sortByQuery = temp;
    }
  }
  if (lat && isNumeric(lat.toString())) {
    latQuery = parseFloat(lat.toString());
  }
  if (lng && isNumeric(lng.toString())) {
    lngQuery = parseFloat(lng.toString());
  }
  if (category) {
    let catStr = category.toString();
    const { locations } = store.getState() as RootState;
    const { categories } = locations;
    categoryObj = categories.categories.find(
      (cat: any) => cat.name.toLowerCase() === catStr.toLowerCase(),
    );
  }
  await store.dispatch(fetchCategories() as any);

  await store.dispatch(
    fetchInıtData(
      JSON.parse(
        JSON.stringify({
          page: pageQuery,
          sortby: sortByQuery,
          lat: latQuery,
          lng: lngQuery,
          category: categoryObj?.id,
          search: search?.toString(),
        }),
      ),
    ) as any,
  );

  return {
    props: {
      query: JSON.parse(
        JSON.stringify({
          page: pageQuery,
          sortby: sortByQuery,
          lat: latQuery,
          lng: lngQuery,
          category: categoryObj?.name.toLowerCase(),
          category_id: categoryObj?.id,
          search: search?.toString(),
        }),
      ),
    },
  };
});

export default Home;
