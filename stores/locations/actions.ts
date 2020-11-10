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
} from './types';
import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import Axios from 'axios';
import queryString from 'query-string';

export function fetchInıtData(query: {
  page?: number;
  sortby?: 'abc' | 'last' | 'nearby';
  lat?: number;
  lng?: number;
}) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.

    const stringified = queryString.stringify(query);
    console.log(stringified);

    dispatch({ type: FETCH_INIT_DATA_REQUEST });
    const { data, status } = await Axios.get(api + `/local/search?${stringified}`);
    if (status == 200) {
      dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: data });
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
