import { AlertState, AlertActionTypes, SUCCESS, ERROR, CLEAR } from './types';

const initialState: AlertState = null;
export const alertReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes,
): AlertState => {
  switch (action.type) {
    case SUCCESS:
      return { type: 'alert-success', message: action.payload };
    case ERROR:
      return { type: 'alert-danger', message: action.payload };
    case CLEAR:
      return null;
    default:
      return state;
  }
};
