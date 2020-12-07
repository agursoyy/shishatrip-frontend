import React, { FC, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../../stores';
import Link from 'next/link';
import './index.scss';
import IPageConfig from '../../../interfaces/PageConfig';
import Sidebar from '../../../components/dashboard/sidebar';
import CreateLocation from '../../../components/dashboard/createLocation';
import { fetchCategories } from '../../../stores/locations/actions';

type IProps = {};

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

// Profile Page
const DashboardLocation: INextPage<IProps> = () => {
  return (
    <div className="dashboard-location-page">
      <Sidebar />
      <div className="dashboard-location-content">
        <CreateLocation />
      </div>
    </div>
  );
};

DashboardLocation.pageConfig = {
  header: false,
  footer: false,
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  await store.dispatch(fetchCategories() as any);
  return {
    props: {},
  };
});
export default DashboardLocation;
