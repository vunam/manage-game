import { createActions, handleActions } from 'redux-actions';

const SET = 'players/set';
const LOGOUT = 'players/logout';

const initialState = {
  list: null,
};

export const { user: actions } = createActions({
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
