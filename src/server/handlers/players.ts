import {isEqual} from 'lodash';
import * as Chance from 'chance';
import {showApiError, showApiResult} from '../helpers/response';
import {verifyAccess} from '../helpers/authentication';
import {
  createPlayer,
  findPlayerById,
  getAllPlayers,
  queryPlayers,
  updatePlayerById,
} from '../services/players';
import {generatePlayer} from '../helpers/generate';
import {getAllTeams, findTeamById, updateTeamById} from '../services/teams';
import {createMessage} from '../services/messages';

export const postCreatePlayer = ctx => {
  const currentUser = verifyAccess(ctx);
  if (currentUser.role !== 'admin') {
    return showApiError(ctx, 'Permission denied', 403);
  }
  const chance = new Chance();
  const player = generatePlayer('', chance.pickone(['Goal', 'Def', 'Mid', 'Att']));

  createPlayer(player);

  return showApiResult(ctx, player);
};

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
    sellValue: statusAvailable ? Number(sellValue) : currentPlayer.value,
  });

  showApiResult(ctx, 'success');
};

export const postTransaction = ctx => {
  const {id, team} = ctx.params;

  const currentUser = verifyAccess(ctx);

  if (!id || !team) {
    return showApiError(ctx, 'Missing data', 422);
  }

  const newTeam = findTeamById(team);

  if (newTeam.user !== currentUser.id) {
    return showApiError(ctx, 'Not allowed', 403);
  }

  const currentPlayer = findPlayerById(id);
  const currentTeam = findTeamById(currentPlayer.team);

  if (currentPlayer.sellValue > newTeam.money) {
    return showApiError(ctx, 'Not enough money', 400);
  }

  // Update new team's finance

  const newTeamMoney = newTeam.money - currentPlayer.sellValue;
  const newTeamValue = newTeam.value + currentPlayer.sellValue;

  updateTeamById(newTeam.id, {
    money: newTeamMoney,
    value: newTeamValue,
  });

  // Update old team's finance

  const currentTeamMoney = currentTeam.money + currentPlayer.sellValue;
  const currentTeamValue = currentTeam.value - currentPlayer.value;

  updateTeamById(currentPlayer.team, {
    money: currentTeamMoney,
    value: currentTeamValue,
  });

  createMessage({
    date: new Date().toISOString(),
    team: currentTeam.id,
    message: `${currentPlayer.firstName} ${
      currentPlayer.lastName
    } has been bought by ${newTeam.name} for $${currentPlayer.sellValue}.`,
  });

  updatePlayerById(id, {
    team,
    status: 'NONE',
    value: currentPlayer.sellValue,
    sellValue: currentPlayer.sellValue,
  });

  showApiResult(ctx, 'success');
};
