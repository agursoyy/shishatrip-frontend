import React, { FC, useState } from 'react';
import './locationList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { fetchInıtData } from '../../stores/locations/actions';
import Loading from '../../components/loading';
import ILocationListQuery from '../../interfaces/locationListQuery';

import InfiniteScroll from 'react-infinite-scroll-component';
import Alert from '../alert';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';

const LocationListFilter = dynamic(
  () => import('../locationListFilter'), // replace '@components/map' with your component's location
  { ssr: false }, // This line is important. It's what prevents server-side render
);
const LocationCard = dynamic(
  () => import('../locationCard'), // replace '@components/map' with your component's location
  { ssr: true },
);

type IProps = {
  query: ILocationListQuery;
};

const LocationList: FC<IProps> = ({ query }) => {
  const { page, sortby, lat, lng, category, category_id, search, location } = query;

  const dispatch = useDispatch();
  const { locations, auth, alert } = useSelector((state: RootState) => state);
  const { locationSearchLoading, data, locationSearchVal, categories } = locations;

  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = () => {
    let nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    setTimeout(async () => {
      let query = {
        search,
        lat,
        lng,
        category: category,
        sortby,
        page: nextPage,
      };
      await dispatch(fetchInıtData(query));
    }, 0);
  };

  return (
    <div className="location-list-container">
      <div className="places-search-wrapper">
        <div className="row ml-0 mr-0">
          <div className="col-lg-7 offset-lg-3">
            <div className="places-search">
              <input
                type="search"
                id="address-input"
                className="address-input"
                placeholder={'Suche Stadt oder Ort'}
              />
              <img className="places-search-icon" src="/icons/algolia-search-icon.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="list-content">
        <div className="row ml-0 mr-0">
          <div className="col-lg-3">
            <div className="location-list-filters-wrapper">
              <LocationListFilter query={query} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="location-list ">
              {locationSearchLoading ? (
                <div className="list--loading">
                  <Loading />
                </div>
              ) : data ? (
                <InfiniteScroll
                  dataLength={data.locals.length}
                  next={loadMore}
                  hasMore={true}
                  style={{ overflow: 'visible' }}
                  loader={
                    <div className="d-flex justify-content-center">
                      <Loading />
                    </div>
                  }
                >
                  {data.locals.map((localItem: any, index: number) => {
                    return (
                      <LazyLoad
                        key={index}
                        once={true}
                        offset={1000}
                        placeholder={
                          <div
                            style={{ height: 160 }}
                            className="d-flex justify-content-center align-items-center"
                          ></div>
                        }
                      >
                        <div className="location-list-item">
                          <LocationCard
                            link={`/place/${localItem.slug}`}
                            as={'/place/[slug]'}
                            locationItem={localItem}
                          />
                        </div>
                      </LazyLoad>
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <div className="mt-5">
                  {alert && <Alert type={alert.type} message={alert.message} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
