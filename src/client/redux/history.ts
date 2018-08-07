import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';

export interface RootState {
  nextRoute: string;
}

const NEXT_ROUTE = 'history/next-route';

const initialState = {
  nextRoute: null,
};

export const {history: actions} = createActions({
  [NEXT_ROUTE]: null,
});

export default handleActions(
  {
    [NEXT_ROUTE]: (state, action) => ({
      ...state,
      nextRoute: action.payload,
    }),
  },
  initialState,
);

export const selectors = {
  getNextRoute: state => state.nextRoute,
};

const nextRouteEpic: Epic<any, RootState> = action$ =>
  action$.ofType(NEXT_ROUTE).pipe(
    mergeMap(({ payload }) => payload ? [actions.nextRoute(null)] : []),
  );

export const epics = combineEpics(nextRouteEpic);
