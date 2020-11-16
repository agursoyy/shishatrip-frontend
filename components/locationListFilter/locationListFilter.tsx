import React, { FC, useEffect, useState } from 'react';
import Router from 'next/router';
import './locationListFilter.scss';
import Dropdown from 'react-dropdown';
import LocationCard from '../locationCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
  clearFilterBySearchVal,
  fetchInıtData,
  filterBySearchVal,
  filterByLocationValue,
  fetchData,
  clearFilterByLocationValue,
} from '../../stores/locations/actions';
import queryString from 'query-string';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Loading from '../../components/loading';
import ILocationListQuery from '../../interfaces/locationListQuery';

import InfiniteScroll from 'react-infinite-scroll-component';

type IProps = {
  query: ILocationListQuery;
};

const LocationListFilter: FC<IProps> = ({ query }) => {
  const { page, sortby, lat, lng, category, category_id, search, location } = query;

  const dispatch = useDispatch();
  const {
    locations: { locationSearchVal, categories },
    alert,
  } = useSelector((state: RootState) => state);

  const [searchInput, setSetSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [places, setPlaces] = useState<any>(null);

  useEffect(() => {
    handleAutoComplete();
  }, []);

  useEffect(() => {
    if (places) {
      places.close();
      if (locationSearchVal) {
        places.setVal(locationSearchVal.value);
      } else {
        places.setVal('');
      }
    }
  });

  const handleAutoComplete = () => {
    var places = require('places.js');
    var placesAutocomplete = places({
      appId: 'plRHUFFMA91H',
      apiKey: '595d92fe0344df051d9f2660f9476121',
      language: 'de',
      countries: ['de'],
      type: 'city',
      container: document.querySelector('#address-input'),
      value: locationSearchVal && locationSearchVal.value,
    });
    setPlaces(placesAutocomplete);
    placesAutocomplete.on('change', async (e: any) => {
      filterByLocation(e.suggestion);
    });
    placesAutocomplete.on('clear', async (e: any) => {
      clearFilterByLocation();
    });
  };

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
    let query: ILocationListQuery = {
      //location: suggestion.name.toLowerCase(),
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
      category_id,
      search,
      sortby,
    };
    console.log(query);
    dispatch(filterByLocationValue(suggestion, query));
  };

  const clearFilterByLocation = () => {
    const query: ILocationListQuery = { sortby, search, category_id };
    if (page && page > 1) {
      query.page = page;
    }
    console.log(query);
    dispatch(clearFilterByLocationValue(query));
    //routePush(query);
  };
  const filterByCategory = (categoryId: number) => {
    let query: ILocationListQuery = {};
    if (categoryId == -1) {
      // clear filter.
      query = { lat, lng, sortby };
    } else {
      if (page && page > 1) {
        query.page = page;
      }
      console.log(categoryId);
      query = {
        ...query,
        lat,
        lng,
        sortby,
        category: categories.categories.find((f: any) => f.id == categoryId)?.name.toLowerCase(),
        search,
      };
    }
    routePush(query);
  };

  const filterBySearchValue = () => {
    if (searchInput) {
      let query: ILocationListQuery = {
        lat,
        lng,
        sortby,
        category,
        location,
        search: searchInput,
      };
      if (page && page > 1) {
        query.page = page;
      }
      routePush(query);
    }
  };

  const clearFilterBySearchValue = () => {
    let query: ILocationListQuery = {
      lat,
      lng,
      sortby,
      category,
      location,
    };
    if (page && page > 1) {
      query.page = page;
    }
    routePush(query);
  };

  const sortBy = (sortQuery: 'abc' | 'last' | 'near' | 'clear') => {
    let query: ILocationListQuery = {};
    if (sortQuery === 'clear') {
      query = { lat, lng, category };
    } else {
      query = { ...query, lat, lng, category, sortby: sortQuery, location, search };
    }
    routePush(query);
  };

  return (
    <div className="locals-list-filter">
      <div className="locals-list-filter__elements">
        {((locationSearchVal && lat) || search) && (
          <div className="filter-criterias form-group">
            <label>Such Kriterien</label>

            {locationSearchVal && lat && (
              <div className="form-group child mr-0 mb-2">
                <button className="filtered-location" onClick={clearFilterByLocation}>
                  {locationSearchVal.name}
                  <span className="btn times ml-3 ">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z"></path>
                    </svg>{' '}
                  </span>
                </button>
              </div>
            )}
            {search && (
              <div className="form-group  child mr-0 mb-0">
                <button className="filtered-location" onClick={clearFilterBySearchValue}>
                  {search}
                  <span className="btn times ml-3 ">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z"></path>
                    </svg>{' '}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-group search-input-group">
          <label>Suchwort</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Suche nach Name"
            value={searchInput}
            onChange={(e) => {
              setSetSearchInput(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                filterBySearchValue();
              }
            }}
          />
          <button className="btn btn-link search-btn" onClick={filterBySearchValue}>
            <span className="filter__search-icon">
              <svg
                width="35"
                height="36"
                viewBox="0 0 35 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0" y="0.199997" width="30" height="30.8" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.2 22.1707C10.2236 22.1707 7 18.8611 7 14.7787C7 10.6962 10.2236 7.38666 14.2 7.38666C18.1765 7.38666 21.4 10.6962 21.4 14.7787C21.4 16.524 20.8108 18.1281 19.8255 19.3927L22.7657 22.4112C23.0781 22.732 23.0781 23.252 22.7657 23.5728C22.4533 23.8935 21.9467 23.8935 21.6343 23.5728L18.6941 20.5542C17.4624 21.5658 15.9 22.1707 14.2 22.1707ZM18.2331 18.7674C18.2057 18.789 18.1794 18.8127 18.1543 18.8384C18.1292 18.8642 18.1062 18.8912 18.0851 18.9193C17.0782 19.9154 15.7087 20.528 14.2 20.528C11.1072 20.528 8.59998 17.9539 8.59998 14.7787C8.59998 11.6034 11.1072 9.02933 14.2 9.02933C17.2928 9.02933 19.8 11.6034 19.8 14.7787C19.8 16.3277 19.2033 17.7336 18.2331 18.7674Z"
                  fill="#6e6161"
                  opacity="1"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="form-group">
          <label className="filter-label">Sortiern</label>
          <Dropdown
            className="filter-select"
            options={[
              {
                value: 'clear',
                label: 'Sortiern nach',
                className: !sortby ? 'is-selected' : '',
              },
              { value: 'abc', label: 'Abc', className: sortby === 'abc' ? 'selected-option' : '' },
              {
                value: 'last',
                label: 'Letzte',
                className: sortby === 'last' ? 'selected-option' : '',
              },
              {
                value: 'near',
                label: 'Nähe',
                className: sortby === 'near' ? 'selected-option' : '',
              },
            ]}
            value={
              !sortby
                ? 'Sortiern nach'
                : sortby === 'abc'
                ? 'Abc'
                : sortby === 'last'
                ? 'Letzte'
                : sortby === 'near'
                ? 'Nähe'
                : 'Sortiern nach'
            }
            onChange={(e) => {
              sortBy(e.value as any);
            }}
          />
        </div>
        <div className="form-group">
          <label className="filter-label">Kategorie</label>
          <Dropdown
            className="filter-select"
            options={[
              { value: -1, label: 'Kategorie auswählen' },
              ...(categories
                ? categories.categories.map((cat: any) => {
                    return {
                      value: cat.id,
                      label: cat.name,
                      className: category_id == cat.id ? 'selected-option' : '',
                    };
                  })
                : []),
            ]}
            value={
              !category_id
                ? 'Kategorie wählen'
                : categories.categories.find((cat: any) => cat.id == category_id).name
            }
            onChange={(e) => {
              console.log(e);
              filterByCategory(e.value as any);
            }}
          />
          <div className="separator"></div>
        </div>
        <div className="form-group d-flex flex-wrap flex-row flex-sm-row flex-lg-column">
          <label className="filter-label w-100">Besonderheiten</label>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              Backgommon
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox1"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox1"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              TV
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox2"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox2"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              POS
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox3"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox3"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              DRINK
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox4"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox4"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              Wifi
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="checkbox5"
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <label
              htmlFor="checkbox5"
              className="d-flex align-items-center"
              style={{ lineHeight: '16px' }}
            >
              Playstation 5
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationListFilter;
