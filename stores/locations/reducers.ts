import {
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
} from './types';

const initialState = {
  loading: true,
  error: false,
  data: null,
  filteredData: null,
  locationSearchVal: null,
  sortByVal: null,
  filterByCategory: null,
  visitedLocalData: null,
};

export function locationReducer(state = initialState, action: any) {
  switch (action.type) {
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
      return { ...state, loading: false, error: true };
    case FETCH_SINGLE_LOCAL_DATA_SUCESS:
      return { ...state, loading: false, error: false, visitedLocalData: action.payload };
    case FETCH_SINGLE_LOCAL_DATA_FAILED:
      return { ...state, loading: false, error: true, visitedLocalData: false };
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
