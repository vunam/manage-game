import { createActions, handleActions } from 'redux-actions';

const SET = 'user/set';
const LOGOUT = 'user/logout';

const initialState = {
  user: null,
};

export const { user: actions } = createActions({
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
