import {
  FETCH_INIT_DATA_REQUEST,
  FETCH_INIT_DATA_SUCCESS,
  FETCH_INIT_DATA_FAILED,
  START_FILTER_LOADING,
  FILTER_BY_SEARCH_PARAM,
  CLEAR_FILTER_BY_SEARCH_PARAM,
  SORT_BY_VALUE,
  FILTER_BY_NAME_INPUT,
  CLEAR_FILTER_SORT_BY_VALUE,
  FETCH_SINGLE_LOCAL_DATA_SUCESS,
  FETCH_SINGLE_LOCAL_DATA_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_BY_SEARCH_PARAM_END,
  FETCH_BY_SEARCH_PARAM_REQUEST,
  SET_QUERY,
  SET_FETCH_LOCK,
} from './types';
import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import Axios from 'axios';
import queryString from 'query-string';
import ILocationListQuery from '../../interfaces/locationListQuery';
import Router from 'next/router';
import { SUCCESS } from '../alert/types';
import { error, success } from '../alert/actions';
import fetch from '../api';
import { func } from 'prop-types';
import { fetchVisitedLocalStories } from '../stories/actions';
import { objectsAreEqual } from '../../utils';
import { deepEqual } from 'assert';

export function fetchCategories() {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { categories },
    } = getState();
    if (!categories) {
      try {
        dispatch({ type: FETCH_CATEGORIES_REQUEST });
        const data = await fetch({ url: `/categories`, auth: false }, 200);
        if (data) {
          dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
        } else {
          dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: [] });
        }
      } catch (err) {
        dispatch({ type: FETCH_CATEGORIES_FAILED });
        dispatch(error('Something went wrong...'));
      }
    }
  };
}

export function fetchData(query: {
  page?: number;
  sortby?: 'abc' | 'last' | 'near';
  lat?: number;
  lng?: number;
  category?: any;
  search?: string;
}) {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const { locations } = getState();

    dispatch({ type: FETCH_INIT_DATA_REQUEST });
    try {
      const form = { ...query };
      const data = await fetch({ url: `/local/search`, auth: false, form }, 200);
      if (data) {
        dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: locations.data });
      }
      dispatch(success('Location list data fetched successfully.'));
    } catch (err) {
      dispatch({ type: FETCH_INIT_DATA_FAILED });
      dispatch(error('Something went wrong...'));
    }
  };
}

export function setQueryValue(query: ILocationListQuery) {
  return { type: SET_QUERY, payload: query };
}
export function setFetchLock(val: boolean) {
  return { type: SET_FETCH_LOCK, payload: val };
}

export function fetchInıtData(query: {
  page?: number;
  sortby?: 'abc' | 'last' | 'near';
  lat?: number;
  lng?: number;
  category?: string;
  search?: string;
}) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const { locations } = getState();
    const { locationSearchVal } = locations;
    if (locationSearchVal) {
      query.lat = locationSearchVal.latlng.lat;
      query.lng = locationSearchVal.latlng.lng;
    }

    const storeQueryParam = JSON.parse(JSON.stringify(locations.query));
    const queryParam = JSON.parse(JSON.stringify(query));
    console.log(storeQueryParam);
    console.log(queryParam);
    console.log(objectsAreEqual(storeQueryParam, queryParam));
    const stringified = queryString.stringify(query);
    console.log(stringified);
    if (!objectsAreEqual(storeQueryParam, queryParam) || !storeQueryParam) {
      // if we already have the same data, don't fetch same thing again...
      dispatch(setQueryValue(query));
      dispatch({ type: FETCH_INIT_DATA_REQUEST });
      try {
        const form = { ...query };
        const data = await fetch({ url: `/local/search`, auth: false, form }, 200);
        if (data) {
          if (query.page === 1) {
            dispatch({
              type: FETCH_INIT_DATA_SUCCESS,
              payload: { locals: data.locals.slice(0, 10) },
            });
          } else {
            let tempData = locations.data ? { ...locations.data } : { locals: [] };
            let locals = [...tempData.locals, ...data.locals];
            tempData.locals = locals;
            dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: tempData });
          }
        } else {
          dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: locations.data });
        }
        dispatch(success('Location list data fetched successfully.'));
      } catch (err) {
        dispatch({ type: FETCH_INIT_DATA_FAILED });
        dispatch(error('Something went wrong...'));
      }
    }
  };
}

export function fetchVisitedLocalData(slug: string) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    const {
      locations: { visitedLocalData },
    } = getState();

    if (!visitedLocalData || visitedLocalData['0'].slug !== slug) {
      const { data, status } = await Axios.get(api + '/local/' + slug);
      if (status == 200) {
        dispatch({ type: FETCH_SINGLE_LOCAL_DATA_SUCESS, payload: { visitedLocalData: data } });
        await dispatch(fetchVisitedLocalStories(1)); // fetch it with real id later.
      } else {
        dispatch({ type: FETCH_SINGLE_LOCAL_DATA_FAILED });
      }
    }
  };
}

export function filterBySearchVal(param: any) {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch({
      type: FILTER_BY_SEARCH_PARAM,
      payload: { locationSearchVal: param },
    });
  };
}

export function clearFilterBySearchVal() {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { data },
    } = getState();
    if (data) {
      dispatch({ type: CLEAR_FILTER_BY_SEARCH_PARAM });
    }
  };
}

/*
export const filterByLocationValue = (suggestion: any, query: ILocationListQuery) => {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch(filterBySearchVal(suggestion)); // save filtered location in store globally!.
    await dispatch({ type: FETCH_BY_SEARCH_PARAM_REQUEST });
    await dispatch(fetchData(query));
    await dispatch({ type: FETCH_BY_SEARCH_PARAM_END });
  };
};

export const clearFilterByLocationValue = (query: ILocationListQuery) => {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch(clearFilterBySearchVal());
    await dispatch({ type: FETCH_BY_SEARCH_PARAM_REQUEST });
    await dispatch(fetchData(query));
    await dispatch({ type: FETCH_BY_SEARCH_PARAM_END });
  };
};*/
