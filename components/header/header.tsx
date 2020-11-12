import React, { FC, useEffect, useRef, useState } from 'react';
import './header.scss';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
  clearFilterBySearchVal,
  filterByLocationValue,
  filterBySearchVal,
} from '../../stores/locations/actions';
import queryString from 'query-string';

interface IProps {
  algoliaSearch: boolean;
}
const Header: FC<IProps> = ({ algoliaSearch }) => {
  const router = useRouter();
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const {
    locations: { loading, filteredData, locationSearchVal, categories },
  } = useSelector((state: RootState) => state);

  const [places, setPlaces] = useState<any>(null);

  useEffect(() => {
    handleHeaderScrollClass();
    handleAutoComplete();
  }, []);

  useEffect(() => {
    if (locationSearchVal && places) {
      places.setVal(locationSearchVal.value);
    }
  });

  const handleHeaderScrollClass = () => {
    window.onscroll = function (e: any) {
      // called when the window is scrolled.
      var height = $(window).scrollTop();
      if (window.innerWidth > 1200) {
        if (height && height >= 225) {
          (headerRef.current as any).classList.add('scrolled');
        } else {
          (headerRef.current as any).classList.remove('scrolled');
        }
      }
    };
  };

  const handleAutoComplete = () => {
    var places = require('places.js');
    var placesAutocomplete = places({
      appId: 'plRHUFFMA91H',
      apiKey: '595d92fe0344df051d9f2660f9476121',
      language: 'de',
      countries: ['de'],
      type: 'city',
      container: document.querySelector('#header--address-input'),
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

  const filterByLocation = (suggestion: any) => {
    // suggestion object obtained from Algolia autocomplate search.
    dispatch(filterBySearchVal(suggestion)); // save filtered location in store globally!.
    const query = {
      ...router.query,
      location: suggestion.name.toLowerCase(),
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    };
    dispatch(filterByLocationValue(suggestion, query));
  };
  const clearFilterByLocation = () => {
    dispatch(clearFilterBySearchVal());
    const query = { ...router.query, lat: undefined, lng: undefined, location: undefined };
    const stringified = queryString.stringify(query as any);
    let isObjectEmpty = true;
    let keys = Object.keys(query);
    keys.forEach((element) => {
      if ((query as any)[`${element}`] !== undefined) {
        isObjectEmpty = false;
      }
    });
    Router.push(`/index${!isObjectEmpty ? `?${stringified}` : ''}`);
  };
  return (
    <React.Fragment>
      <header className="header" ref={headerRef}>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Link href="/">
            <a className="navbar-brand">
              <img src="/images/shishatrip_small_logo_pink.png" alt="logo" />
            </a>
          </Link>
          <button
            className="navbar-toggler d-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="#navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="" role="button">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>

          <button
            className="navbar-toggler d-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
            <span className="sr-only">Toggle navigation</span>
          </button>
          <button
            className="navbar-toggler navbar-toggler-right collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span> </span>
            <span> </span>
            <span> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {/*
                <li className="nav-item ">
                <Link href="/auth/login">
                  <a className="nav-link" href="#">
                    Eintragen
                  </a>
                </Link>
              </li>
                 */}
              {algoliaSearch && (
                <li className="nav-item  search--scrolled">
                  <div className="places-search">
                    <input
                      type="search"
                      id="header--address-input"
                      className="address-input"
                      placeholder={'Suche Stadt oder Ort'}
                    />
                  </div>
                </li>
              )}
              <li className="nav-item collapsed">
                <details>
                  <summary>
                    <div className="user-menu-toggle">
                      <div className="toggle">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                      </div>
                      <span className="img-wrapper">
                        <img src="/images/icons/user.svg" />
                      </span>
                    </div>
                  </summary>
                  <div className="answer">
                    <div className="answer-nav-item">
                      <Link href="/auth/register">
                        <a className="answer-nav-item-link dark">Register</a>
                      </Link>
                    </div>
                    <div className="answer-nav-item">
                      <Link href="/auth/login">
                        <a className="answer-nav-item-link">Login</a>
                      </Link>
                    </div>
                    <div className="answer-nav-item-separator"></div>
                    <div className="answer-nav-item">
                      <Link href="/auth/register">
                        <a className="answer-nav-item-link">Bla</a>
                      </Link>
                    </div>
                    <div className="answer-nav-item">
                      <Link href="/auth/login">
                        <a className="answer-nav-item-link">Bla</a>
                      </Link>
                    </div>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
