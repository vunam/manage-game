import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

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

export const epics = combineEpics();
