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

const { publicRuntimeConfig } = getConfig();

type IProps = {
  custom: string;
};

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

const Home: INextPage<IProps> = ({ custom }) => {
  const { news, auth } = useSelector((state: RootState) => state);
  console.log(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchInıtData());
    }, 1250);
  }, []);

  const {
    locations: { loading, filteredData },
  } = useSelector((state: RootState) => state);

  return (
    <div className="home-page">
      <div className="d-none">Prop from Redux {auth.message}</div>
      <div className="d-none">Prop from getInitialProps {custom} </div>
      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <div className="content">
            <div className="container">
              <div className="header-wrapper">{<Header />}</div>
              <div className="home-location-list">
                {loading ? (
                  <div className="home-location-list--loading">
                    <Loading />
                  </div>
                ) : !filteredData ? (
                  <div className="home-location-list--error">Error...</div>
                ) : (
                  <LocationList />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.pageConfig = {
  auth: true,
  footer: false,
};

/*
Home.getInitialProps = async ({ store, pathname, query }: NextPageContext): Promise<IProps> => {
  store.dispatch({ type: 'FOO', payload: 'foo' }); // The component can read from the store's state when rendered
  const { auth } = store.getState();
  return { custom: auth.message }; // You can pass some custom props to the component from here
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
