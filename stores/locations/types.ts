export const START_FILTER_LOADING = 'START_FILTER_LOADING';
export const FILTER_BY_SEARCH_PARAM = 'FILTER_BY_SEARCH_PARAM';
export const FETCH_BY_SEARCH_PARAM_REQUEST = 'FETCH_BY_SEARCH_PARAM_REQUEST';
export const FETCH_BY_SEARCH_PARAM_END = 'FETCH_BY_SEARCH_PARAM_END';

export const SORT_BY_VALUE = 'SORT_BY_VALUE';
export const FILTER_BY_NAME_INPUT = 'FILTER_BY_NAME_INPUT';
export const CLEAR_FILTER_BY_SEARCH_PARAM = 'CLEAR_FILTER_BY_SEARCH_PARAM';
export const CLEAR_FILTER_SORT_BY_VALUE = 'CLEAR_FILTER_SORT_BY_VALUE';
export const CLEAR_FILTER_BY_NAME_INPUT = 'CLEAR_FILTER_BY_NAME_INPUT';
export const FETCH_INIT_DATA_REQUEST = 'FETCH_INIT_DATA_REQUEST';
export const FETCH_INIT_DATA_SUCCESS = 'FETCH_INIT_DATA_SUCCESS';
export const FETCH_INIT_DATA_FAILED = 'FETCH_INIT_DATA_FAILED';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';
export const FETCH_SINGLE_LOCAL_DATA_SUCESS = 'FETCH_SINGLE_LOCAL_DATA_SUCESS';
export const FETCH_SINGLE_LOCAL_DATA_FAILED = 'FETCH_SINGLE_LOCAL_DATA_FAILED';
export const SET_QUERY = 'SET_QUERY';
export const SET_FETCH_LOCK = 'SET_FETCH_LOCK';

import ILocationListQuery from '../../interfaces/locationListQuery';

export interface ILocationState {
  loading: boolean;
  locationSearchLoading: boolean;
  error: boolean;
  data: any;
  categories: any;
  locationSearchVal: any;
  filterByCategory: any;
  visitedLocalData: any;
  query: (ILocationListQuery & { pageFromStore?: boolean }) | null;
  fetchLock: boolean;
}
