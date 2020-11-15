import { settings } from 'nprogress';
import {
  ILocationState,
  FETCH_INIT_DATA_REQUEST,
  FETCH_INIT_DATA_FAILED,
  FETCH_INIT_DATA_SUCCESS,
  START_FILTER_LOADING,
  FILTER_BY_SEARCH_PARAM,
  CLEAR_FILTER_BY_SEARCH_PARAM,
  SORT_BY_VALUE,
  FILTER_BY_NAME_INPUT,
  CLEAR_FILTER_SORT_BY_VALUE,
  CLEAR_FILTER_BY_NAME_INPUT,
  FETCH_SINGLE_LOCAL_DATA_SUCESS,
  FETCH_SINGLE_LOCAL_DATA_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_BY_SEARCH_PARAM_REQUEST,
  FETCH_BY_SEARCH_PARAM_END,
  SET_QUERY,
} from './types';

const initialState: ILocationState = {
  loading: true,
  locationSearchLoading: false,
  error: false,
  data: null,
  filteredData: null,
  categories: null,
  locationSearchVal: null,
  sortByVal: null,
  filterByCategory: null,
  visitedLocalData: null,
  query: null,
};

export function locationReducer(state: ILocationState = initialState, action: any): ILocationState {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILED:
      return { ...state, loading: false, error: true, categories: null };
    case SET_QUERY:
      return { ...state, query: action.payload };
    case FETCH_INIT_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_INIT_DATA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload,
        filteredData: action.payload,
      };
    case FETCH_INIT_DATA_FAILED:
      return { ...state, loading: false, error: true, data: null, filteredData: null };
    case FETCH_SINGLE_LOCAL_DATA_SUCESS:
      return { ...state, loading: false, error: false, visitedLocalData: action.payload };
    case FETCH_SINGLE_LOCAL_DATA_FAILED:
      return { ...state, loading: false, error: true, visitedLocalData: null };
    case FETCH_BY_SEARCH_PARAM_REQUEST:
      return { ...state, locationSearchLoading: true };
    case FETCH_BY_SEARCH_PARAM_END:
      return { ...state, locationSearchLoading: false };
    case START_FILTER_LOADING:
      return { ...state, loading: true };
    case FILTER_BY_SEARCH_PARAM:
      return { ...state, loading: false, ...action.payload };
    case SORT_BY_VALUE:
      return { ...state, loading: false, ...action.payload };
    case FILTER_BY_NAME_INPUT:
      return { ...state, loading: false, ...action.payload };
    case CLEAR_FILTER_BY_SEARCH_PARAM:
      return { ...state, loading: false, locationSearchVal: null };
    case CLEAR_FILTER_SORT_BY_VALUE:
      return { ...state, loading: false, sortByVal: null };
    default:
      return state;
  }
}
