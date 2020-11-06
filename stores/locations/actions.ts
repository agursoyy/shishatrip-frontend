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
} from './types';
import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();
import Axios from 'axios';
//import config from '../../config.json';

export function fetchInıtData(force?: boolean) {
  // force to fetch data even though it exists
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { data },
    } = getState();
    if (!data || force) {
      dispatch({ type: FETCH_INIT_DATA_REQUEST });
      const { data, status } = await Axios.get(api + '/local/search');
      if (status == 200) {
        dispatch({ type: FETCH_INIT_DATA_SUCCESS, payload: data });
      } else {
        dispatch({ type: FETCH_INIT_DATA_FAILED });
      }
    }
  };
}

export function filterBySearchVal(param: any) {
  // place suggestion
  return async (dispatch: any, getState: () => RootState) => {
    // redux thunk.
    const {
      locations: { error, data },
    } = getState();
    if (data) {
      dispatch({ type: START_FILTER_LOADING });

      const { locals } = data;
      const { administrative, country, county, name } = param;
      const filtered = locals.filter((local: any) => {
        const { address } = local;
        const addressObj = JSON.parse(address);
        console.log(addressObj);
        if (!addressObj.administrative || !addressObj.county) {
          return addressObj.value.indexOf(name) >= 0;
        } else
          return (
            addressObj.administrative == administrative &&
            (addressObj.county == county || addressObj.county == name)
          );
      });
      dispatch({
        type: FILTER_BY_SEARCH_PARAM,
        payload: { locationSearchVal: param, filteredData: { locals: filtered } },
      });
    }
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
      dispatch(fetchInıtData(true));
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
/*

export function sortByValue(sortingKeyNumber) {
  return async (dispatch, getState) => { // redux thunk.
    const { locations: { filteredData } } = getState();
    let filtered;
    if(filteredData) {
      if(sortingKeyNumber === 1) { // filter by 'up'.
       dispatch({type: START_FILTER_LOADING});
        const {locals} = filteredData;
        let temp = [...locals];
        filtered = temp.sort((a,b) => {
          return b.up - a.up;
        })
      }
      else if(sortingKeyNumber === 2) { // filter by 'up'.
      dispatch({type: START_FILTER_LOADING});
       const {locals} = filteredData;
       let temp = [...locals];
       filtered = temp.sort((a,b) => {
         return b.down - a.down;
       })
     }
    
      if(filtered) {
        setTimeout(() => {
          dispatch({type: SORT_BY_VALUE, payload: {sortByVal: sortingKeyNumber ,filteredData: {locals: filtered}}});
        }, 500);
      }
    }
  };
}


export function filterByNameInput(name) {
  return async (dispatch, getState) => { // redux thunk.
    const { locations: { error, filteredData,data } } = getState();
    if(data) {
      const {locals} = data;
      const filtered = locals.filter((local) => {
        return local.name.toLowerCase().includes(name.toLowerCase());
      })
      dispatch({type: FILTER_BY_NAME_INPUT, payload: {filteredData: {locals: filtered}}});
    }
  };
}

export function filter() {
  return async (dispatch, getState) => { // redux thunk.
    const { locations: { error, data,locationSearchVal, sortByVal, filterByCategory } } = getState();

    if(locationSearchVal) {
      dispatch(filterBySearchVal(locationSearchVal));
    }
    if(sortByVal) {
      dispatch(sortByValue(sortByVal));
    }
  };
}




export function filterByCategory(categoryId) {
 
}


export function clearFilterByCategory() {

}



export function clearFilterBySearchVal() {
  return async (dispatch, getState) => { // redux thunk.
    const { locations: {data } } = getState();
    if(data) {
      dispatch({type: CLEAR_FILTER_BY_SEARCH_PARAM});
      dispatch(filter());
    }
  };
}
export function clearFilterSortByVal() {
  return async (dispatch, getState) => { // redux thunk.
    const { locations: {data } } = getState();
    if(data) {
      dispatch({type: CLEAR_FILTER_SORT_BY_VALUE});
      dispatch(filter());
    }
  };
}
*/
