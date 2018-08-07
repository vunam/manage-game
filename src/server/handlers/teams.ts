import { getAllTeams } from '../services/teams';

export const getTeams = async ctx => {
  const result = getAllTeams();

  ctx.body = {
    meta: {},
    data: result,
  };
};
