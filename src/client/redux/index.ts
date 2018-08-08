import {reducer as formReducer} from 'redux-form';
import {combineEpics} from 'redux-observable';
import general, {epics as generalEpics} from './general';
import history, {epics as historyEpics} from './history';
import messages, {epics as messagesEpics} from './messages';
import notification from './notification';
import players, {epics as playersEpics} from './players';
import teams, {epics as teamsEpics} from './teams';
import user, {epics as userEpics} from './user';

export const rootEpic: object = combineEpics(
  playersEpics,
  userEpics,
  teamsEpics,
  historyEpics,
  messagesEpics,
  generalEpics,
);

export default {
  history,
  user,
  players,
  teams,
  messages,
  general,
  form: formReducer,
  notification,
};
