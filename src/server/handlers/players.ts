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
  const {available} = ctx.request.body;


  if (!id) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  const playerUpdated = db.get('players')
    .find({ id })
    .assign({status: available === 'true' ? 'AVAILABLE' : 'NONE'})
    .write();

  ctx.body = {
    data: 'success',
  };
};
