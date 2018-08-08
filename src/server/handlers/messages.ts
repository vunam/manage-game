import {showApiResult} from '../helpers/response';
import {findMessagesByTeam} from '../services/messages';

export const getMessages = async ctx => {
  const {team} = ctx.params;
  const result = await findMessagesByTeam(team);
  showApiResult(ctx, result);
};
