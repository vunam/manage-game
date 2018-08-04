import { combineEpics } from 'redux-observable';
import user from './user';
import players, { epics as playersEpics } from './players';

export const rootEpic: Object = combineEpics(
  playersEpics
);

export default {
  user,
  players
};
