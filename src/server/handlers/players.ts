import getDb from '../helpers/db';

export const getPlayers = ctx => {
  const db = getDb();
  const allPlayers = db.get('players')
  ctx.body = {
    meta: {},
    data: allPlayers,
  };
};
