import { Route } from 'next/dist/next-server/server/router';

export const ROUTE_CHANGE_START = 'ROUTE_CHANGE_START';
export const ROUTE_CHANGE_COMPLETE = 'ROUTE_CHANGE_COMPLETE';

export interface IRouteState {
  routeChanging: boolean;
}

interface RouteChangeStartAction {
  type: typeof ROUTE_CHANGE_START;
}

interface RouteChangeCompleteAction {
  type: typeof ROUTE_CHANGE_COMPLETE;
}

export type RouterActionTypes = RouteChangeStartAction | RouteChangeCompleteAction;
