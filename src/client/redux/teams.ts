import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import TeamType from '../types/Team';
import {actions as generalActions} from './general';

export interface RootState {
  list?: [TeamType];
}

const GET_TEAMS_ATTEMPT = 'teams/get-teams-attempt';
const GET_TEAMS_SUCCESS = 'teams/get-teams-success';

const initialState = {
  list: null,
};

export const {teams: actions} = createActions({
  [GET_TEAMS_ATTEMPT]: null,
  [GET_TEAMS_SUCCESS]: null,
});

export default handleActions(
  {
    [GET_TEAMS_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
  initialState,
);

export const selectors = {
  getTeams: state => state.list,
};

const getTeamsEpic: Epic<any, RootState> = action$ =>
  action$.ofType(GET_TEAMS_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.get(`/api/teams`).pipe(
        map(({response}) => actions.getTeamsSuccess(response.data)),
        catchError(({response, status}) => [
          generalActions.handleError({response, status}),
        ]),
      ),
    ),
  );

export const epics = combineEpics(getTeamsEpic);
