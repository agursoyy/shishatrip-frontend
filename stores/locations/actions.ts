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
} from './types';
import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import Axios from 'axios';
import queryString from 'query-string';

export function fetchCategories() {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { categories },
    } = getState();
    if (!categories) {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
      const { data, status } = await Axios.get(api + `/categories`);
      if (status == 200 || status == 204) {
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_CATEGORIES_FAILED });
      }
    }
  };
}
export function fetchInıtData(query: {
  page?: number;
  sortby?: 'abc' | 'last' | 'near';
  lat?: number;
  lng?: number;
  category?: any;
  search?: string;
}) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const { locations } = getState();
    const stringified = queryString.stringify(query);
    console.log(stringified);

    dispatch({ type: FETCH_INIT_DATA_REQUEST });
    const { data, status } = await Axios.get(api + `/local/search?${stringified}`);
    if (status == 200 || status == 204) {
      if (query.page === 1) {
        dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: data });
      } else {
        let tempData = locations.data ? { ...locations.data } : { locals: [] };
        if (query.page && query.page > 1 && data) {
          let locals = [...tempData.locals, ...data?.locals];
          tempData.locals = locals;
        }
        dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: tempData });
      }
    } else {
      dispatch({ type: FETCH_INIT_DATA_FAILED });
    }
  };
}

export function fetchVisitedLocalData(slug: string) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    const { data, status } = await Axios.get(api + '/local/' + slug);
    if (status == 200) {
      dispatch({ type: FETCH_SINGLE_LOCAL_DATA_SUCESS, payload: data });
    } else {
      dispatch({ type: FETCH_SINGLE_LOCAL_DATA_FAILED });
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
export function filter() {
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { error, data, locationSearchVal, sortByVal, filterByCategory },
    } = getState();

    if (locationSearchVal) {
      dispatch(filterBySearchVal(locationSearchVal));
    }
    /*if (sortByVal) {
      dispatch(sortByValue(sortByVal));
    }*/
  };
}
