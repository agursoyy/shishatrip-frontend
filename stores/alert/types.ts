export const SUCCESS = 'ALERT_SUCCESS';
export const ERROR = 'ALERT_ERROR';
export const CLEAR = 'ALERT_CLEAR';

type AlertType = {
  type: 'alert-success' | 'alert-danger';
  message: string;
};

export type AlertState = AlertType | null;

interface SuccessErrorAction {
  // action type
  type: typeof SUCCESS | typeof ERROR;
  payload: string; // message itself.
}

interface ClearAction {
  type: typeof CLEAR;
}

export type AlertActionTypes = SuccessErrorAction | ClearAction;
