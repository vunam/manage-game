import { combineEpics } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import history  from './history';
import user, { epics as userEpics } from './user';
import players, { epics as playersEpics } from './players';

export const rootEpic: Object = combineEpics(
  playersEpics,
  userEpics,
);

export default {
  history,
  user,
  players,
  form: formReducer,
};
