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
import './slug.scss';
import SectionHeaderWithPinkLogo from '../../components/sectionHeaderWithPinkLogo';
import PhotoSection from '../../components/sectionPhoto/sectionPhoto';
import { fetchVisitedLocalData, filter } from '../../stores/locations/actions';
import { useSelector } from 'react-redux';

type IProps = {
  error?: {
    status: number;
    message: string;
  };
};

export const siteTitle = 'Beste Shisha Bar, Lounge & Shop - localtrip';

const {
  publicRuntimeConfig: { api },
} = getConfig();

const Slug: NextPage<IProps> = ({ error }) => {
  const [profileSection, setProfileSection] = useState('photo');

  const {
    locations: { loading, filteredData, locationSearchVal, visitedLocalData },
  } = useSelector((state: RootState) => state);

  const setProfileSectionHandler = (v: string) => {
    setProfileSection(v);
  };

  if (error || !visitedLocalData) {
    return <Error statusCode={error ? error.status : 404} />;
  }

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
              local={data}
            />
            {profileSection === 'photo' && (
              <PhotoSection setProfileSectionHandler={setProfileSectionHandler} local={data} />
            )}
          </div>
        </Container>
      </main>
    </div>
  );
};

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
export default Slug;
