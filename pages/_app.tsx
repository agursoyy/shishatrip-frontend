import React, { Dispatch } from 'react';
import App, { AppContext, AppInitialProps, Container, NextWebVitalsMetric } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/index.scss';
import '../styles/globals.scss';

import { Store, wrapper } from '../stores';
import Header from '../components/header';
import { MapDispatchToProps, connect } from 'react-redux';
import { routeChangeComplete, routeChangeStart } from '../stores/router/actions';
import HeadCustom from '../utils/headCustom';

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
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            rel="text/javascript"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.js"
          />
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossOrigin="anonymous"
            async={true}
          ></script>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <script type="text/javascript" src="/js/zuck.min.js"></script>
          <script type="text/javascript" src="/js/script.js"></script>
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
