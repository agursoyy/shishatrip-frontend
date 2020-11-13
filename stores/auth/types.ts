// /store/auth/types.ts

export const LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';
export const RESET_ACCESS_TOKEN = 'RESET_ACCESS_TOKEN';
export const LOGOUT = 'USER_LOGOUT';

export interface AuthState {
  loading: boolean;
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface Auth {
  user: any;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoggedInAction {
  type: typeof LOGIN_SUCCESS;
  payload: Auth;
}
interface GetUserAction {
  type: typeof FETCH_USER_DETAILS;
  payload: any;
}
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}
interface LogoutAction {
  type: typeof LOGOUT;
}
interface ResetAccessTokenAction {
  type: typeof RESET_ACCESS_TOKEN;
  payload: { accessToken: string; refreshToken: string };
}
export type AuthActionTypes =
  | LoginRequestAction
  | LoggedInAction
  | LoginFailureAction
  | LogoutAction
  | GetUserAction
  | ResetAccessTokenAction;
