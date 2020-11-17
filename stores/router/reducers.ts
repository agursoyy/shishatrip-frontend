import { IRouteState, ROUTE_CHANGE_START, ROUTE_CHANGE_COMPLETE, RouterActionTypes } from './types';

const initialState: IRouteState = {
  routeChanging: false,
};

export function routerReducer(
  state: IRouteState = initialState,
  action: RouterActionTypes,
): IRouteState {
  switch (action.type) {
    case ROUTE_CHANGE_START:
      return { routeChanging: true };
    case ROUTE_CHANGE_COMPLETE:
      return { routeChanging: false };
    default:
      return state;
  }
}
