import React, { Dispatch } from 'react';
import App, { AppContext, AppInitialProps, Container, NextWebVitalsMetric } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/index.scss';

import { Store, wrapper } from '../stores';
import Header from '../components/header';
import { MapDispatchToProps, connect } from 'react-redux';
import { routeChangeComplete, routeChangeStart } from '../stores/router/actions';

const { publicRuntimeConfig } = getConfig();

interface IAppContext extends AppContext {
  store?: Store;
}

interface IProps extends AppInitialProps {
  pageConfig: any;
  routeChangeStart: () => void;
  routeChangeComplete: () => void;
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
    const { routeChangeStart, routeChangeComplete } = this.props;
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
      routeChangeStart();
    });
    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
      routeChangeComplete();
    });
    Router.events.on('routeChangeError', () => NProgress.done());
  }
  public render() {
    const { Component, pageProps, pageConfig } = this.props;
    const { layout, header, footer, sidebar, header_algolia } = pageConfig;
    return (
      <Container>
        <Head>
          <title>shishatrip</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/icons/favicon.svg" />
          <script type="text/javascript" src="/js/zuck.min.js" defer={true}></script>
          <script type="text/javascript" src="/js/script.js" defer={true}></script>
          <link rel="preconnect" href={publicRuntimeConfig.api} />
          <link rel="dns-prefetch" href={publicRuntimeConfig.api} />
          <link rel="preconnect" type="text/css" href="/_next/static/css/styles.chunk.css" />
          {/*preload css */}
        </Head>
        {layout ? (
          <>
            {header && <Header algoliaSearch={header_algolia} />}
            <Component {...pageProps} />
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </Container>
    );
  }
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

function mapDispatchToProps(dispatch: any) {
  return {
    routeChangeStart: () => {
      dispatch(routeChangeStart());
    },
    routeChangeComplete: () => {
      dispatch(routeChangeComplete());
    },
  };
}

export default wrapper.withRedux(connect(null, mapDispatchToProps)(MyApp));
