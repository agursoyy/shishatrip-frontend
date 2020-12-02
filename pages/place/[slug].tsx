import React, { FC, useEffect, useState } from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import Error from 'next/error';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../stores';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import '../../styles/globals.scss';
import './slug.scss';
import SectionHeaderWithPinkLogo from '../../components/sectionHeaderWithPinkLogo';
import { fetchVisitedLocalData } from '../../stores/locations/actions';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import IPageConfig from '../../interfaces/PageConfig';
import Router from 'next/router';

const PhotoSection = dynamic(
  () => import('../../components/sectionPhoto/sectionPhoto'), // replace '@components/map' with your component's location
  { ssr: true }, // This line is important. It's what prevents server-side render
);
const SectionStories = dynamic(
  () => import('../../components/sectionStories'), // replace '@components/map' with your component's location
  { ssr: true }, // This line is important. It's what prevents server-side render
);
const SectionInfo = dynamic(
  () => import('../../components/sectionInfo'), // replace '@components/map' with your component's location
  { ssr: true }, // This line is important. It's what prevents server-side render
);

type IProps = {
  error?: {
    status: number;
    message: string;
  };
};

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig;
};

export const siteTitle = 'Beste Shisha Bar, Lounge & Shop - localtrip';

const {
  publicRuntimeConfig: { api },
} = getConfig();

const Slug: INextPage<IProps> = ({ error }) => {
  const [profileSection, setProfileSection] = useState<'info' | 'photo' | 'stories'>('photo');
  const router = useRouter();

  useEffect(() => {
    function historyBackEvent(e: any) {
      var state = e.state;
      if (state !== null) {
        //load content with ajax
        //Router.push('/');
      }
    }
    window.addEventListener('popstate', historyBackEvent);
    return () => {
      window.removeEventListener('popstate', historyBackEvent);
    };
  }, []);

  const {
    locations: { loading, locationSearchVal, visitedLocalData },
    stories: { visitedLocalStories },
  } = useSelector((state: RootState) => state);

  const setProfileSectionHandler = (v: 'info' | 'photo' | 'stories', callback?: () => {}) => {
    setProfileSection(v);
    if (callback) callback();
  };

  if (error) {
    return <Error statusCode={error ? error.status : 404} message={error.message} />;
  }

  if (!visitedLocalData) return null;

  const data = visitedLocalData;
  return (
    <div className="place-slug-page">
      <Head>
        <meta
          name="description"
          content="local, Shisha Lounge, Shisha Bar, Shisha Cafes & Shisha Shops auf Shishatrip, Shisha Cafés Nürnberg"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>
        <Container
          fluid
          className="local-container-fluid-cafe local-container-fluid-section1-wrapper-cafe"
        >
          <div className="local-container-fluid-section1-cafe">
            <SectionHeaderWithPinkLogo
              setProfileSectionHandler={setProfileSectionHandler}
              profileSection={profileSection}
              local={data}
            />
            {profileSection === 'photo' && (
              <PhotoSection setProfileSectionHandler={setProfileSectionHandler} local={data} />
            )}
            {profileSection === 'info' && (
              <SectionInfo setProfileSectionHandler={setProfileSectionHandler} local={data} />
            )}
            {profileSection === 'stories' &&
              visitedLocalStories &&
              visitedLocalStories.length > 0 && <SectionStories />}
          </div>
        </Container>
      </main>
    </div>
  );
};

Slug.pageConfig = {
  header_algolia: true,
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const slug = query.slug?.toString();
  let error;
  if (slug) {
    await store.dispatch(fetchVisitedLocalData(slug) as any);
  }
  const {
    locations: { visitedLocalData },
  } = store.getState() as RootState;

  if (!visitedLocalData) {
    error = {
      status: 404,
      message: 'data fetching failed...',
    };
  }
  //await store.dispatch(fetchInıtData() as any);
  // return {props: {error}} causes json.serialize error directly. This is specific for these getServerSideProps, getStaticProps lifecycle method.
  return { props: { ...(error && { error: error }) } };
});
/*
//  getStaticPaths function specifies dynamic routes to pre-render based
export async function getStaticPaths() {
  const res = await fetch('https://api.shishatrip.de/api/all');
  const data = await res.json();
  const paths = data.locals
    .slice(0, 300)
    .filter((local: any) => local.slug != null)
    .map((local: any) => {
      return { params: { slug: local.slug } };
    });
  return {
    paths,
    fallback: true,
  };
}*/
/*
// getStaticProps and getStaticPaths must be used together if the page is a dynamic page.
export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
  console.log('2. Page.getStaticProps uses the store to dispatch things');
  // store.dispatch({type: 'TICK', payload: 'was set in other page ' + preview});
  const slug = params?.slug?.toString();
  // const slug = query.slug?.toString();
  let error;
  if (slug) {
    await store.dispatch(fetchVisitedLocalData(slug) as any);
  }
  const {
    locations: { visitedLocalData },
  } = store.getState() as RootState;

  if (!visitedLocalData) {
    error = {
      status: 404,
      message: 'data fetching failed...',
    };
  }
  // return {props: {error}} causes json.serialize error directly. This is specific for these getStaticProps, getServerSideProps  lifecycle method.
  return { props: { ...(error && { error: error }) } };
});
*/
/*
Slug.getInitialProps = async ({ store, pathname, query }: NextPageContext): Promise<IProps> => {
  const slug = query.slug?.toString();
  let error;
  if (slug) {
    await store.dispatch(fetchVisitedLocalData(slug) as any);
  }
  const {
    locations: { visitedLocalData },
  } = store.getState() as RootState;

  if (!visitedLocalData) {
    error = {
      status: 404,
      message: 'data fetching failed...',
    };
  }
  return { error }; // You can pass some custom props to the component from here
};
*/
export default Slug;
