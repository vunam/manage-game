import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import * as qs from 'qs';

export interface RootState {
  list?: [Object];
}

const GET_PLAYERS_ATTEMPT = 'players/get-players-attempt';
const GET_PLAYERS_SUCCESS = 'players/get-players-success';

const initialState = {
  list: null,
};

export const {players: actions} = createActions({
  [GET_PLAYERS_ATTEMPT]: null,
  [GET_PLAYERS_SUCCESS]: null,
});

export default handleActions(
  {
    [GET_PLAYERS_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
  initialState,
);

export const selectors = {
  getPlayers: state => state.list,
  getTeam: state => state.list,
};

const getPlayersEpic: Epic<any, RootState> = action$ =>
  action$.ofType(GET_PLAYERS_ATTEMPT).pipe(
    mergeMap(({ payload }) =>
      ajax.get(`/api/players${payload ? `?${qs.stringify(payload)}` : ''}`).pipe(
        map(({response}) => actions.getPlayersSuccess(response.data)),
        catchError(() => []),
      ),
    ),
  );

export const epics = combineEpics(getPlayersEpic);
