import React, { FC, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../stores';
import Link from 'next/link';
import './index.scss';
import IPageConfig from '../../interfaces/PageConfig';
import Sidebar from '../../components/dashboard/sidebar';

type IProps = {};

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

// Profile Page
const Dashboard: INextPage<IProps> = () => {
  return (
    <div className="dashboard-profile-page">
      <Sidebar />
      <div className="dashboard-profile-content">asjfjas</div>
    </div>
  );
};

Dashboard.pageConfig = {
  header: false,
  footer: false,
};
export default Dashboard;
