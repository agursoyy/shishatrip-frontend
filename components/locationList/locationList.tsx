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
    locations: { loading, filteredData, locationSearchVal, categories },
    auth,
    alert,
  } = useSelector((state: RootState) => state);

  const [searchInput, setSetSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    var places = require('places.js');
    var placesAutocomplete = places({
      appId: 'plRHUFFMA91H',
      apiKey: '595d92fe0344df051d9f2660f9476121',
      language: 'de',
      countries: ['de'],
      type: 'city',
      container: document.querySelector('#address-input'),
      value: locationSearchVal && lat && locationSearchVal.value,
    });
    placesAutocomplete.on('change', async (e: any) => {
      filterByLocation(e.suggestion);
    });
    placesAutocomplete.on('clear', async (e: any) => {
      clearFilterByLocation();
    });
    Router.events.on('routeChangeComplete', () => {
      setSetSearchInput('');
    });
  }, []);

  const routePush = (query: any) => {
    const stringified = queryString.stringify(query as any);
    let isObjectEmpty = true;
    let keys = Object.keys(query);
    keys.forEach((element) => {
      if (query[`${element}`] !== undefined) {
        isObjectEmpty = false;
      }
    });
    setCurrentPage(1); // return to first page.
    Router.push(`/index${!isObjectEmpty ? `?${stringified}` : ''}`);
  };

  const filterByLocation = (suggestion: any) => {
    // suggestion object obtained from Algolia autocomplate search.
    dispatch(filterBySearchVal(suggestion)); // save filtered location in store globally!.
    let query: ILocationListQuery = { search };
    if (page && page > 1) {
      query.page = page;
    }
    query = {
      ...query,
      location: suggestion.name.toLowerCase(),
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    };
    setCurrentPage(1);
    dispatch(filterByLocationValue(suggestion, query));
  };

  const clearFilterByLocation = () => {
    dispatch(clearFilterBySearchVal());
    const query: ILocationListQuery = { sortby, search };
    if (page && page > 1) {
      query.page = page;
    }
    routePush(query);
  };

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
      document.body.style.overflow = 'hidden';
      await dispatch(fetchInıtData(query));
      document.body.style.overflow = 'auto';
    }, 2000);
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
              {filteredData ? (
                <InfiniteScroll
                  dataLength={filteredData.locals.length}
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
                      {filteredData.locals.map((localItem: any, index: number) => {
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
