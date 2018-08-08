import * as qs from 'qs';
import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {createSelector} from 'reselect';
import {ajax} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import countryList from '../constants/countryList';
import PlayerType from '../types/Player';
import {actions as generalActions} from './general';

export interface RootState {
  list?: [PlayerType];
  editedPlayer: any;
}

const GET_PLAYERS_ATTEMPT = 'players/get-players-attempt';
const GET_PLAYERS_SUCCESS = 'players/get-players-success';

const TRANSFER_PLAYER_ATTEMPT = 'players/transfer-player-attempt';
const TRANSFER_PLAYER_SUCCESS = 'players/transfer-player-success';

const BUY_PLAYER_ATTEMPT = 'players/buy-player-attempt';
const BUY_PLAYER_SUCCESS = 'players/buy-player-success';

const CREATE_PLAYER_ATTEMPT = 'players/create-player-attempt';
const CREATE_PLAYER_SUCCESS = 'players/create-player-success';

const DELETE_PLAYER_ATTEMPT = 'players/delete-player-attempt';
const DELETE_PLAYER_SUCCESS = 'players/delete-player-success';

const EDIT_PLAYER_ATTEMPT = 'players/edit-player-attempt';
const EDIT_PLAYER_SUCCESS = 'players/edit-player-success';

const initialState = {
  list: null,
  editedPlayer: null,
};

export const {players: actions} = createActions({
  [GET_PLAYERS_ATTEMPT]: null,
  [GET_PLAYERS_SUCCESS]: null,
  [TRANSFER_PLAYER_ATTEMPT]: null,
  [TRANSFER_PLAYER_SUCCESS]: null,
  [BUY_PLAYER_ATTEMPT]: null,
  [BUY_PLAYER_SUCCESS]: null,
  [CREATE_PLAYER_ATTEMPT]: null,
  [CREATE_PLAYER_SUCCESS]: null,
  [DELETE_PLAYER_ATTEMPT]: null,
  [DELETE_PLAYER_SUCCESS]: null,
  [EDIT_PLAYER_ATTEMPT]: null,
  [EDIT_PLAYER_SUCCESS]: null,
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
  getEditedPlayer: state => state.editedPlayer,
};

const getPlayersEpic: Epic<any, RootState> = action$ =>
  action$.ofType(GET_PLAYERS_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax
        .get(`/api/players${payload ? `?${qs.stringify(payload)}` : ''}`)
        .pipe(
          map(({response}) => actions.getPlayersSuccess(response.data)),
          catchError(({response, status}) => [
            generalActions.handleError({response, status}),
          ]),
        ),
    ),
  );

const transferPlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(TRANSFER_PLAYER_ATTEMPT).pipe(
    mergeMap(({payload: {player, available, sellValue, ...rest}}) =>
      ajax
        .post(`/api/players/${player}/transfer`, {
          available,
          sellValue,
        })
        .pipe(
          mergeMap(({response}) => [
            actions.getPlayersAttempt(rest),
            actions.transferPlayerSuccess(response.data),
          ]),
          catchError(({response, status}) => [
            generalActions.handleError({response, status}),
          ]),
        ),
    ),
  );

const buyPlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(BUY_PLAYER_ATTEMPT).pipe(
    mergeMap(({payload: {player, team, available, ...rest}}) =>
      ajax
        .post(`/api/players/${player}/transaction/${team}`, {
          available,
        })
        .pipe(
          mergeMap(({response}) => [
            actions.getPlayersAttempt(rest),
            actions.buyPlayerSuccess(response.data),
          ]),
          catchError(({response, status}) => [
            generalActions.handleError({response, status}),
          ]),
        ),
    ),
  );

const createPlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(CREATE_PLAYER_ATTEMPT).pipe(
    mergeMap(() =>
      ajax.post(`/api/players/create`).pipe(
        mergeMap(({response}) => [
          actions.createPlayerSuccess(response.data),
          actions.getPlayersAttempt({withTeam: true}),
        ]),
        catchError(({response, status}) => [
          generalActions.handleError({response, status}),
        ]),
      ),
    ),
  );

const deletePlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(DELETE_PLAYER_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.delete(`/api/players/${payload}`).pipe(
        mergeMap(({response}) => [
          actions.deletePlayerSuccess(response.data),
          actions.getPlayersAttempt({withTeam: true}),
        ]),
        catchError(({response, status}) => [
          generalActions.handleError({response, status}),
        ]),
      ),
    ),
  );

const editPlayerEpic: Epic<any, RootState> = action$ =>
  action$.ofType(EDIT_PLAYER_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.put(`/api/players/${payload}`).pipe(
        mergeMap(({response}) => [
          actions.editPlayerSuccess(response.data),
          // TODO back to admin
        ]),
        catchError(({response, status}) => [
          generalActions.handleError({response, status}),
        ]),
      ),
    ),
  );

export const epics = combineEpics(
  getPlayersEpic,
  transferPlayerEpic,
  buyPlayerEpic,
  createPlayerEpic,
  deletePlayerEpic,
  editPlayerEpic,
);
