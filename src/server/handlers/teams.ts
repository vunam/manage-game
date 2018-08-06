import {isEqual} from 'lodash';
import getDb from '../helpers/db';

const db = getDb();

export const getTeams = async ctx => {
  const result = db
    .get('teams')
    .value()

  ctx.body = {
    meta: {},
    data: result,
  };
};
