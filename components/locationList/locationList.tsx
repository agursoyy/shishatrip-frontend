import React, { FC, useEffect, useState } from 'react';
import Router from 'next/router';
import './locationList.scss';
import Dropdown from 'react-dropdown';
import LocationCard from '../locationCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
  clearFilterBySearchVal,
  fetchInıtData,
  filterBySearchVal,
  filterByLocationValue,
} from '../../stores/locations/actions';
import queryString from 'query-string';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Loading from '../../components/loading';
import LocationListFilter from '../../components/locationListFilter';
import ILocationListQuery from '../../interfaces/locationListQuery';

import InfiniteScroll from 'react-infinite-scroll-component';
import Alert from '../alert';
import { authReducer } from '../../stores/auth/reducers';
import { allowStateReadsStart } from 'mobx/lib/internal';

type IProps = {
  query: ILocationListQuery;
};

const LocationList: FC<IProps> = ({ query }) => {
  const { page, sortby, lat, lng, category, category_id, search, location } = query;

  const dispatch = useDispatch();
  const {
    locations: { locationSearchLoading,  data, locationSearchVal, categories },
    auth,
    alert,
  } = useSelector((state: RootState) => state);

  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setTimeout(async () => {
      let query = {
        search,
        lat,
        lng,
        category: category_id,
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
                  {
                    <>
                      {data.locals.map((localItem: any, index: number) => {
                        return (
                          <div className="location-list-item" key={index}>
                            <LocationCard
                              link={`/place/${localItem.slug}`}
                              as={'/place/[slug]'}
                              locationItem={localItem}
                            />
                          </div>
                        );
                      })}
                    </>
                  }
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
