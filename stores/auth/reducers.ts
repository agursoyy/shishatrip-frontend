// /store/auth/reducers.ts

import {
  AuthState,
  AuthActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_DETAILS,
  RESET_ACCESS_TOKEN,
} from './types';

const initialState: AuthState = {
  loading: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes, // AuthActionTypes
): AuthState {
  switch (action.type) {
    case RESET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, user: null };
    case LOGOUT:
      return { ...state, user: null, accessToken: null, refreshToken: null };
    case FETCH_USER_DETAILS:
      return { ...state, loading: false, user: action.payload };
    default:
      return state;
  }
}
