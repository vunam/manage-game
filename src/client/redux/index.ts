import {reducer as formReducer} from 'redux-form';
import {combineEpics} from 'redux-observable';
import history, {epics as historyEpics} from './history';
import players, {epics as playersEpics} from './players';
import teams, {epics as teamsEpics} from './teams';
import user, {epics as userEpics} from './user';
import notification from './notification';

export const rootEpic: object = combineEpics(
  playersEpics,
  userEpics,
  teamsEpics,
  historyEpics,
);

export default {
  history,
  user,
  players,
  teams,
  form: formReducer,
  notification,
};
