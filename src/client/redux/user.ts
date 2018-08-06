import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {actions as historyActions} from './history';

export interface RootState {
  user?: Object;
  verifying: boolean;
}

const LOGIN_ATTEMPT = 'user/login-attempt';
const LOGIN_SUCCESS = 'user/login-success';

const VERIFY_ATTEMPT = 'user/verify-attempt';
const VERIFY_SUCCESS = 'user/verify-success';
const VERIFY_FAILED = 'user/verify-failed';

const CREATE_ATTEMPT = 'user/create-attempt';
const CREATE_SUCCESS = 'user/create-success';

const UPDATE_ATTEMPT = 'user/update-attempt';
const UPDATE_SUCCESS = 'user/update-success';

const SET = 'user/set';
const LOGOUT = 'user/logout';

const initialState = {
  user: null,
  verifying: false,
};

export const {user: actions} = createActions({
  [LOGIN_ATTEMPT]: null,
  [LOGIN_SUCCESS]: null,
  [VERIFY_ATTEMPT]: null,
  [VERIFY_SUCCESS]: null,
  [VERIFY_FAILED]: null,
  [CREATE_ATTEMPT]: null,
  [CREATE_SUCCESS]: null,
  [UPDATE_ATTEMPT]: null,
  [UPDATE_SUCCESS]: null,
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
    [VERIFY_ATTEMPT]: state => ({
      ...state,
      verifying: true,
    }),
    [VERIFY_SUCCESS]: state => ({
      ...state,
      verifying: false,
    }),
    [VERIFY_FAILED]: state => ({
      ...state,
      verifying: false,
    }),
  },
  initialState,
);

export const selectors = {
  getUser: state => state.user,
  getVerifying: state => state.verifying,
};

const loginEpic: Epic<any, RootState> = action$ =>
  action$.ofType(LOGIN_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.post('/api/user/login', payload).pipe(
        mergeMap(({response}) => {
          return [
            historyActions.nextRoute('/dashboard'),
            actions.set(response.data),
            actions.loginSuccess(response.data),
          ];
        }),
        catchError(() => []),
      ),
    ),
  );

const createUserEpic: Epic<any, RootState> = action$ =>
  action$.ofType(CREATE_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.post('/api/user/create', payload).pipe(
        mergeMap(({response}) => {
          return [
            historyActions.nextRoute('/dashboard'),
            actions.set(response.data),
            actions.createSuccess(response.data),
          ];
        }),
        catchError(() => []),
      ),
    ),
  );

const updateUserEpic: Epic<any, RootState> = action$ =>
  action$.ofType(UPDATE_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.post('/api/user/update', payload).pipe(
        mergeMap(({response}) => {
          return [
            historyActions.nextRoute('/dashboard'),
            actions.set(response.data),
            actions.updateSuccess(response.data),
          ];
        }),
        catchError(() => []),
      ),
    ),
  );

const verifyEpic: Epic<any, RootState> = action$ =>
  action$.ofType(VERIFY_ATTEMPT).pipe(
    mergeMap(() =>
      ajax.post('/api/user/tokens', {}).pipe(
        mergeMap(({response}) => {
          return [actions.set(response.data), actions.verifySuccess()];
        }),
        catchError(() => [
          historyActions.nextRoute('/'),
          actions.verifyFailed(),
        ]),
      ),
    ),
  );

const logoutEpic: Epic<any, RootState> = action$ =>
  action$.ofType(LOGOUT).pipe(
    mergeMap(() =>
      ajax.post('/api/user/logout', {}).pipe(
        mergeMap(({response}) => {
          return [actions.set(null), historyActions.nextRoute('/')];
        }),
        catchError(() => [actions.set(null), historyActions.nextRoute('/')]),
      ),
    ),
  );

export const epics = combineEpics(
  loginEpic,
  createUserEpic,
  updateUserEpic,
  verifyEpic,
  logoutEpic,
);
