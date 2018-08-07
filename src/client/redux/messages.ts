import {createActions, handleActions} from 'redux-actions';
import {combineEpics, Epic} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
import {catchError, map, mergeMap} from 'rxjs/operators';
import TeamType from '../types/Team';
import {actions as generalActions} from './general';


export interface RootState {
  list?: [TeamType];
}

const GET_MESSAGES_ATTEMPT = 'messages/get-messages-attempt';
const GET_MESSAGES_SUCCESS = 'messages/get-messages-success';

const initialState = {
  list: [],
};

export const {messages: actions} = createActions({
  [GET_MESSAGES_ATTEMPT]: null,
  [GET_MESSAGES_SUCCESS]: null,
});

export default handleActions(
  {
    [GET_MESSAGES_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
  initialState,
);

export const selectors = {
  getMessages: state => state.list,
};

const getMessagesEpic: Epic<any, RootState> = action$ =>
  action$.ofType(GET_MESSAGES_ATTEMPT).pipe(
    mergeMap(({payload}) =>
      ajax.get(`/api/messages/${payload}`).pipe(
        map(({response}) => actions.getMessagesSuccess(response.data)),
        catchError(({ response, status }) => [
          generalActions.handleError({ response, status })]),
      ),
    ),
  );

export const epics = combineEpics(getMessagesEpic);
