import {isEqual} from 'lodash';
import {getAllTeams} from '../services/teams';
import {getAllPlayers, queryPlayers, findPlayerById, updatePlayerById} from '../services/players';

export const getPlayers = async ctx => {
  const {query} = ctx.request;

  const {withTeam, min, max, firstName, lastName, ...search} = query;

  let result = isEqual(search, {})
    ? getAllPlayers()
    : queryPlayers(search)

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

  ctx.body = {
    meta: {},
    data: result,
  };
};

export const postAddTransfer = ctx => {
  const {id} = ctx.params;
  const {available, sellValue} = ctx.request.body;

  if (!id || !sellValue) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  const currentPlayer = findPlayerById(id);

  const statusAvailable = available === 'true';

  updatePlayerById(id, {
    status: statusAvailable ? 'AVAILABLE' : 'NONE',
    sellValue: statusAvailable ? sellValue : currentPlayer.value,
  });

  ctx.body = {
    data: 'success',
  };
};

export const postTransaction = ctx => {
  const {id, team} = ctx.params;

  if (!id) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  // your team + current owners team
  const currentPlayer = findPlayerById(id);

  // Add in sale value, update budgets and validations
  updatePlayerById(id, {team, status: 'NONE'});

  ctx.body = {
    data: 'success',
  };
};
