import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import { actions as historyActions } from './history';

export interface RootState {
  user?: Object;
}

const LOGIN_ATTEMPT = 'user/login-attempt';
const LOGIN_SUCCESS = 'user/login-success';

const CREATE_ATTEMPT = 'user/create-attempt';
const CREATE_SUCCESS = 'user/create-success';

const SET = 'user/set';
const LOGOUT = 'user/logout';

const initialState = {
  user: null,
};

export const {user: actions} = createActions({
  [LOGIN_ATTEMPT]: null,
  [LOGIN_SUCCESS]: null,
  [CREATE_ATTEMPT]: null,
  [CREATE_SUCCESS]: null,
  [SET]: null,
  [LOGOUT]: null,
});

export default handleActions(
  {
    [SET]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);

export const selectors = {
  getUser: state => state.user,
};

const loginEpic: Epic<any, RootState> = action$ =>
  action$.ofType(LOGIN_ATTEMPT).pipe(
    mergeMap(({ payload }) =>
      ajax.post('/api/user/login', payload).pipe(
        mergeMap(({response}) => {
          return [
            historyActions.nextRoute('/dashboard'),
            actions.loginSuccess(response.data),
          ];
        }),
        catchError(() => []),
      ),
    ),
  );

const createUserEpic: Epic<any, RootState> = action$ =>
  action$.ofType(CREATE_ATTEMPT).pipe(
    mergeMap(({ payload }) =>
      ajax.post('/api/user/create', payload).pipe(
        mergeMap(({response}) => {
          return [
            historyActions.nextRoute('/dashboard'),
            actions.createSuccess(response.data),
          ];
        }),
        catchError(() => []),
      ),
    ),
  );

export const epics = combineEpics(loginEpic, createUserEpic);
