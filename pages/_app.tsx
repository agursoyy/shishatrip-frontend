import React, { FC, useState } from 'react';
import { NextPage } from 'next';
import App, { Container, AppInitialProps, AppContext, AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/index.scss';
import '../styles/globals.scss';

import { Store, wrapper, RootState } from '../stores';
import { Provider, useSelector } from 'react-redux';
import { login } from '../stores/auth/actions';
import { success } from '../stores/alert/actions';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const { publicRuntimeConfig } = getConfig();

interface IAppContext extends AppContext {
  store?: Store;
}

interface IProps extends AppInitialProps {
  pageConfig: any;
}

class MyApp extends App<IProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // ctx.store.dispatch(login({ email: 'email', password: 'password' }) as any); // store! -> we are sure it exists.
    let pageConfig = publicRuntimeConfig.pageConfig; // get page config from next.config
    if ((Component as any).pageConfig) {
      pageConfig = {
        // merge page configs with child component.
        ...pageConfig,
        ...(Component as any).pageConfig,
      };
    }
    if (true) {
      console.log(true);
    }

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
      pageConfig,
    };
  };

  componentDidMount() {
    document.body.style.zoom = '1.0';
  }
  public render() {
    const { Component, pageProps, pageConfig } = this.props;
    const { layout, header, footer, sidebar } = pageConfig;
    return (
      <Container>
        <Head>
          <title>shishatrip</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/icons/favicon.svg" />
          <link
            href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            rel="text/javascript"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.js"
          />
        </Head>
        {layout ? (
          <>
            {header && <Header />}
            <Component {...pageProps} />
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </Container>
    );
  }
}

export default wrapper.withRedux(MyApp);

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());
