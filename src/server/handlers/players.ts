import {isEqual} from 'lodash';
import getDb from '../helpers/db';

const db = getDb();

export const getPlayers = async ctx => {
  const {query} = ctx.request;

  const {withTeam, min, max, firstName, lastName, ...search} = query;

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
    const teams = db
      .get('teams')
      .value()
      .reduce((prev, next) => ({...prev, [next.id]: next.name}), {});

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

  const currentPlayer = db
    .get('players')
    .find({id})
    .value();

  const statusAvailable = available === 'true';

  db.get('players')
    .find({id})
    .assign({
      status: statusAvailable ? 'AVAILABLE' : 'NONE',
      sellValue: statusAvailable ? sellValue : currentPlayer.value,
    })
    .write();

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
  const currentPlayer = db
    .get('players')
    .find({id})
    .value();

  // Add in sale value, update budgets and validations

  db.get('players')
    .find({id})
    .assign({team, status: 'NONE'})
    .write();

  ctx.body = {
    data: 'success',
  };
};
