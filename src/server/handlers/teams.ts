import {showApiResult} from '../helpers/response';
import {getAllTeams} from '../services/teams';

export const getTeams = async ctx => {
  const result = getAllTeams();

  showApiResult(ctx, result);
};
