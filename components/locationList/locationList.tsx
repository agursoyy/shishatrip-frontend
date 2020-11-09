import React, {useEffect} from 'react';
import './locationList.scss';
import Dropdown from 'react-dropdown';
import LocationCard from '../locationCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import {clearFilterBySearchVal, filterBySearchVal} from '../../stores/locations/actions';

const LocationList = () => {
  const dispatch = useDispatch();
  const {
    locations: {loading, filteredData, locationSearchVal},
  } = useSelector((state: RootState) => state);

  useEffect(() => {
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
    placesAutocomplete.on('change', (e: any) => {
      dispatch(filterBySearchVal(e.suggestion));
    });
  }, []);
  return (
    <div className="location-list-container container-fluid">
      <div className="row">
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

      <div className="list-content">
        <div className="row">
          <div className="col-lg-3">
            <div className="locals-list-filter">
              <div className="locals-list-filter__elements">
                {locationSearchVal && (
                  <div className="form-group">
                    <button
                      className="filtered-location"
                      onClick={() => {
                        dispatch(clearFilterBySearchVal());
                      }}
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
                <div className="form-group">
                  <label className="filter-labe d-none">Besonderheiten*</label>
                  <Dropdown
                    className="filter-select"
                    options={[
                      { value: '-1', label: 'Besonderheiten' },
                      { value: '1', label: 'Sky' },
                      { value: '2', label: 'Sky' },
                    ]}
                    value={'Besonderheiten'}
                    onChange={(e) => {
                      console.log(e.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="filter-labe d-none">Besonderheiten*</label>
                  <Dropdown
                    className="filter-select"
                    options={[
                      { value: '-1', label: 'Sortier nach' },
                      { value: '1', label: 'Sky' },
                      { value: '2', label: 'Sky' },
                    ]}
                    value={'Sortier nach'}
                    onChange={(e) => {
                      console.log(e.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="location-list">
              {filteredData &&
                filteredData.locals.map((localItem: any, index: number) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
