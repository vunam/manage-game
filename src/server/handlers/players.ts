import {isEqual} from 'lodash';
import {showApiError, showApiResult} from '../helpers/response';
import {
  findPlayerById,
  getAllPlayers,
  queryPlayers,
  updatePlayerById,
} from '../services/players';
import { getAllTeams, findTeamById } from '../services/teams';

export const getPlayers = async ctx => {
  const {query} = ctx.request;

  const {withTeam, min, max, firstName, lastName, ...search} = query;

  let result = isEqual(search, {}) ? getAllPlayers() : queryPlayers(search);

  if (withTeam) {
    const teams = getAllTeams().reduce(
      (prev, next) => ({...prev, [next.id]: next.name}),
      {},
    );

    result = result.map(item => ({
      ...item,
      teamName: teams[item.team],
    }));
  }

  if (firstName) {
    result = result.filter(item =>
      item.firstName.toLowerCase().startsWith(firstName.toLowerCase()),
    );
  }

  if (lastName) {
    result = result.filter(item =>
      item.lastName.toLowerCase().startsWith(lastName.toLowerCase()),
    );
  }

  if (min) {
    result = result.filter(item => item.value >= Number(min));
  }

  if (max && max !== '-1') {
    result = result.filter(item => item.value <= Number(max));
  }

  showApiResult(ctx, result);
};

export const postAddTransfer = ctx => {
  const {id} = ctx.params;
  const {available, sellValue} = ctx.request.body;

  if (!id || !sellValue) {
    return showApiError(ctx, 'Missing data', 422);
  }

  const currentPlayer = findPlayerById(id);

  const statusAvailable = available === 'true';

  updatePlayerById(id, {
    status: statusAvailable ? 'AVAILABLE' : 'NONE',
    sellValue: statusAvailable ? sellValue : currentPlayer.value,
  });

  showApiResult(ctx, 'success');
};

export const postTransaction = ctx => {
  const {id, team} = ctx.params;

  if (!id || !team) {
    return showApiError(ctx, 'Missing data', 422);
  }

  // are you allowed ?

  // your team + current owners team
  const currentTeam = findTeamById(team);
  const currentPlayer = findPlayerById(id);

  // Add in sale value, update budgets and validations
  updatePlayerById(id, {team, status: 'NONE'});

  showApiResult(ctx, 'success');
};
