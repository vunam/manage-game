import { getAllTeams } from '../services/teams';
import {showApiResult} from '../helpers/response';

export const getTeams = async ctx => {
  const result = getAllTeams();

  showApiResult(ctx, result);
};
