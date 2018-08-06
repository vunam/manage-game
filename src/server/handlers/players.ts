import {isEqual} from 'lodash';
import getDb from '../helpers/db';

export const getPlayers = async ctx => {
  const {query} = ctx.request;
  const db = getDb();

  const {withTeam, ...search} = query;
  let result = isEqual(search, {})
    ? db
        .cloneDeep()
        .get('players')
        .value()
    : db
        .get('players')
        .cloneDeep()
        .chain()
        .filter(search)
        .value();

  if (withTeam) {
    const teams = db.get('teams').value().reduce((prev, next) => ({ ...prev, [next.id]: next.name }) , {});

    result = result.map(item => ({
      ...item,
      teamName: teams[item.team],
    }))
  }

  ctx.body = {
    meta: {},
    data: result,
  };
};
