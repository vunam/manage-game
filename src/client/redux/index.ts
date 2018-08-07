import {reducer as formReducer} from 'redux-form';
import {combineEpics} from 'redux-observable';
import history from './history';
import players, {epics as playersEpics} from './players';
import teams, {epics as teamsEpics} from './teams';
import user, {epics as userEpics} from './user';

export const rootEpic: object = combineEpics(
  playersEpics,
  userEpics,
  teamsEpics,
);

export default {
  history,
  user,
  players,
  teams,
  form: formReducer,
};
