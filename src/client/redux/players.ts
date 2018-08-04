import { createActions, handleActions, Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';

export interface RootState {
  list?: [Object];
}

const GET_PLAYERS_ATTEMPT = 'players/get-players-attempt';
const SET = 'players/set';

const initialState = {
  list: null,
};

export const { user: actions } = createActions({
  [GET_PLAYERS_ATTEMPT]: null,
  [SET]: null,
});

export default handleActions(
  {
    [SET]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
  initialState,
);

export const selectors = {
  getPlayers: state => state.players,
  getTeam: state => state.players,
};

const getPlayersEpic: Epic<Action, RootState> = (action$) =>
  action$
  // action$.ofType(GET_PLAYERS_ATTEMPT).mergeMap(() => []);

export const epics = combineEpics(
  getPlayersEpic,
);
