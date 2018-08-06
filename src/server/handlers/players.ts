import {isEqual} from 'lodash';
import getDb from '../helpers/db';

export const getPlayers = async ctx => {
  const {query} = ctx.request;
  const db = getDb();

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
    result = result.filter(item => item.firstName.toLowerCase().startsWith(firstName.toLowerCase()));
  }

  if (lastName) {
    result = result.filter(item => item.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
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
