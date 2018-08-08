import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';
import {actions as notificationActions} from './notification';
import {actions as historyActions} from './history';

export interface RootState {}

const HANDLE_ERROR = 'general/handle-error';

const initialState = {};

export const {general: actions} = createActions({
  [HANDLE_ERROR]: null,
});

export default handleActions({}, initialState);

export const selectors = {
  getNextRoute: state => state.nextRoute,
};

const handleErrorEpic: Epic<any, RootState> = action$ =>
  action$.ofType(HANDLE_ERROR).pipe(
    mergeMap(({payload}) => {
      return [
        payload.status &&
          payload.status === 401 &&
          historyActions.nextRoute('/'),
        notificationActions.openNotification(payload.response.error),
      ].filter(data => data);
    }),
  );

export const epics = combineEpics(handleErrorEpic);
