import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map} from 'rxjs/operators';

export interface RootState {
  notification?: string;
}

const OPEN_NOTIFICATION = 'notification/open-notification';
const CLOSE_NOTIFCATION = 'notification/close-notification';

const initialState = {
  notification: null,
};

export const {notification: actions} = createActions({
  [OPEN_NOTIFICATION]: null,
  [CLOSE_NOTIFCATION]: null,
});

export default handleActions(
  {
    [OPEN_NOTIFICATION]: (state, action) => ({
      ...state,
      notification: action.payload,
    }),
    [CLOSE_NOTIFCATION]: state => ({
      ...state,
      notification: null,
    }),
  },
  initialState,
);

export const selectors = {
  getNotification: state => state.notification,
};

export const epics = combineEpics();
