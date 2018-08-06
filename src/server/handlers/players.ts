import {isEqual} from 'lodash';
import getDb from '../helpers/db';

export const getPlayers = async ctx => {
  const {query} = ctx.request;
  const db = getDb();
  const result = isEqual(query, {})
    ? db.get('players').value()
    : db
        .get('players')
        .chain()
        .filter({team: 'sktwid1ujkhj49ko'})
        .value();

  ctx.body = {
    meta: {},
    data: result,
  };
};
