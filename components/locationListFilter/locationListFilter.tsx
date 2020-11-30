import React, { FC, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import './locationListFilter.scss';
import Dropdown from 'react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { clearFilterBySearchVal, filterBySearchVal } from '../../stores/locations/actions';
import queryString from 'query-string';
import ILocationListQuery from '../../interfaces/locationListQuery';

type IProps = {
  query: ILocationListQuery;
};

const LocationListFilter: FC<IProps> = ({ query }) => {
  const { page, sortby, lat, lng, category, category_id, search, location } = query;

  const dispatch = useDispatch();
  const {
    locations: { locationSearchVal, categories },
    router: { routeChanging },
  } = useSelector((state: RootState) => state);

  const [searchInput, setSetSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [places, setPlaces] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const mobileFiltersRef = useRef(null);
  const [algoliaFiltered, setAlgoliaFiltered] = useState<any>(null); // suggestion value from algolia is set.

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

    Router.events.on('routeChangeComplete', () => {
      setShowFilters(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    Router.events.on('routeChangeStart', () => {
      setShowFilters(false);
    });
  });
  useEffect(() => {
    if (showFilters) {
      (mobileFiltersRef.current as any).classList.add('collapsed');
      (document.querySelector('body') as any).classList.add('scroll-lock');
    } else {
      (mobileFiltersRef.current as any).classList.remove('collapsed');
      (document.querySelector('body') as any).classList.remove('scroll-lock');
    }
  }, [showFilters]);

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
    placesAutocomplete.on('change', (e: any) => {
      filterByLocation(e.suggestion);
    });
    placesAutocomplete.on('clear', (e: any) => {
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
    setAlgoliaFiltered(null);
    Router.push(`/${!isObjectEmpty ? `?${stringified}` : ''}`);
  };

  const filterByLocation = (suggestion: any) => {
    dispatch(filterBySearchVal(suggestion)); // save filtered location in store globally!.
    setAlgoliaFiltered(suggestion);
  };

  useEffect(() => {
    if (algoliaFiltered) {
      const queryParam = {
        ...query,
        lat: algoliaFiltered.latlng.lat,
        lng: algoliaFiltered.latlng.lng,
        category:
          categories &&
          categories.categories.find((f: any) => f.id == category_id)?.name.toLowerCase(),
      };
      routePush(queryParam);
    }
  }, [algoliaFiltered]);

  const clearFilterByLocation = () => {
    const query: ILocationListQuery = { sortby: undefined, search, category_id };
    if (page && page > 1) {
      query.page = page;
    }
    dispatch(clearFilterBySearchVal());
    routePush(query);
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
    <div className="locals-list-filter" ref={mobileFiltersRef}>
      <div className="locals-list-filter__mobile-nav d-sm-none">
        <div className={`filter-nav-item ${!category && 'active'}`}>
          <a
            className="filter-nav-link"
            role="button"
            onClick={() => {
              filterByCategory(-1);
            }}
          >
            ALL
          </a>
        </div>
        {categories &&
          categories.categories.map(
            (cat: any, index: number) =>
              index < 2 && (
                <div
                  className={`filter-nav-item ${
                    category && category.toLowerCase() === cat.name.toLowerCase() && 'active'
                  }`}
                  key={index}
                >
                  <a
                    className="filter-nav-link"
                    role="button"
                    onClick={() => {
                      filterByCategory(cat.id);
                    }}
                  >
                    {cat.name}
                  </a>
                </div>
              ),
          )}
        <button
          className="btn btn-link p-0 toggle"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="22"
            viewBox="0 0 512 512"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
            fill="#717277"
          >
            <g>
              <path d="m432.733 112.467h-228.461c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-35.661c-8.284 0-15 6.716-15 15s6.716 15 15 15h35.662c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h228.461c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-273.133 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z" />
              <path d="m432.733 241h-35.662c-6.281-18.655-23.927-32.133-44.672-32.133s-38.39 13.478-44.671 32.133h-228.461c-8.284 0-15 6.716-15 15s6.716 15 15 15h228.461c6.281 18.655 23.927 32.133 44.672 32.133s38.391-13.478 44.672-32.133h35.662c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-80.333 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z" />
              <path d="m432.733 369.533h-164.194c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-99.928c-8.284 0-15 6.716-15 15s6.716 15 15 15h99.928c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h164.195c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-208.866 32.134c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.685 17.133 17.132-7.686 17.134-17.133 17.134z" />
            </g>
          </svg>
        </button>
      </div>
      <div className="locals-list-filter__elements">
        {((locationSearchVal && lat) || search) && (
          <div className="filter-criterias form-group">
            <label>Such Kriterien</label>

            {locationSearchVal && lat && (
              <div className="form-group child mr-0 mb-2">
                <button
                  className="filtered-location"
                  onClick={clearFilterByLocation}
                  disabled={routeChanging}
                >
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
                <button
                  className="filtered-location"
                  onClick={clearFilterBySearchValue}
                  disabled={routeChanging}
                >
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
              {
                value: 'abc',
                label: 'Abc',
                className: sortby === 'abc' ? 'selected-option' : '',
              },
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
