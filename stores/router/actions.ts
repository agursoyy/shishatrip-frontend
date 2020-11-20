import { ROUTE_CHANGE_START, ROUTE_CHANGE_COMPLETE } from './types';

import { RootState } from '../index';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { api },
} = getConfig();

export function routeChangeStart() {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch({ type: ROUTE_CHANGE_START });
  };
}

export function routeChangeComplete() {
  return async (dispatch: any, getState: () => RootState) => {
    dispatch({ type: ROUTE_CHANGE_COMPLETE });
  };
}
