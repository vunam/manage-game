import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import * as qs from 'qs';
import {createSelector} from 'reselect';
import countryList from '../constants/countryList';
import PlayerType from '../types/player';

export interface RootState {
  list?: [PlayerType];
}

const GET_PLAYERS_ATTEMPT = 'players/get-players-attempt';
const GET_PLAYERS_SUCCESS = 'players/get-players-success';

const TRANSFER_PLAYER_ATTEMPT = 'players/transfer-player-attempt';
const TRANSFER_PLAYER_SUCCESS = 'players/transfer-player-success';

const initialState = {
  list: null,
};

export const {players: actions} = createActions({
  [GET_PLAYERS_ATTEMPT]: null,
  [GET_PLAYERS_SUCCESS]: null,
  [TRANSFER_PLAYER_ATTEMPT]: null,
  [TRANSFER_PLAYER_SUCCESS]: null,
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

const getPlayers = state => state.list;

export const selectors = {
  getPlayers,
  getPlayersFull: createSelector(
    getPlayers,
    items =>
      items &&
      items.map(item => {
        const countryName = countryList.find(
          country => country.code === item.country,
        );
        return {
          ...item,
          countryName: countryName ? countryName.name : item.country,
        };
      }),
  ),
};

const getPlayersEpic: Epic<any, RootState> = action$ =>
  action$.ofType(GET_PLAYERS_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax
        .get(`/api/players${payload ? `?${qs.stringify(payload)}` : ''}`)
        .pipe(
          map(({response}) => actions.getPlayersSuccess(response.data)),
          catchError(() => []),
        ),
    ),
  );

const transferPlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(TRANSFER_PLAYER_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax
        .post(`/api/players/${payload.player}/transfer`, {
          available: payload.available,
        })
        .pipe(
          mergeMap(({response}) => [
            actions.getPlayersAttempt({ team: payload.team }),
            actions.transferPlayerSuccess(response.data),
          ]),
          catchError(() => []),
        ),
    ),
  );

export const epics = combineEpics(getPlayersEpic, transferPlayerEpic);
