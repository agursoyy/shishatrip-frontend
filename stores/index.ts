import { combineReducers, Store as ReduxStore } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
const { composeWithDevTools } = require('redux-devtools-extension');
import rootSaga from './sagas';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

import { authReducer } from './auth/reducers';
import { alertReducer } from './alert/reducers';
import { newsReducer } from './news/reducers';
import { locationReducer } from './locations/reducers';
import { storyReducer } from './stories/reducers';
import { routerReducer } from './router/reducers';
import { locationFormReducer } from './create-location-form/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  news: newsReducer,
  locations: locationReducer,
  stories: storyReducer,
  router: routerReducer,
  locationForm: locationFormReducer,
});

// *****FOR HYDRATE****
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    console.log(state);
    const nextState = {
      ...state, // use previous state // current state. When page is refreshed, state is empty and it should be merged by payload and sent to client.
      ...action.payload, // apply delta from hydration // next state.  (they are merged).
    };
    //if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    if (state.locations.locationSearchVal) {
      nextState.locations.locationSearchVal = state.locations.locationSearchVal;
    }
    if (state.locations.fetchLock) {
      nextState.locations.fetchLock = state.locations.fetchLock;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReduxStore<RootState>;

const makeStore: MakeStore<RootState> = (context: Context) =>
  createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export const wrapper = createWrapper<RootState>(makeStore, { debug: false });
