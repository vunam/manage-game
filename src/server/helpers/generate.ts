import * as Chance from 'chance';
import * as uniq from 'uniqid';

const chance = new Chance();

export const generatePlayer = (teamId, type) => ({
  id: uniq(),
  firstName: chance.first(),
  lastName: chance.last(),
  age: chance.integer({min: 18, max: 40}),
  country: chance.country().toUpperCase(),
  value: 1000000,
  team: teamId,
  type,
  status: 'NONE',
  sellValue: 0,
});

export const generateTeam = (userId, name, country) => ({
  id: uniq(),
  country: country || chance.country(),
  name,
  user: userId,
  money: 5000000,
  value: 20000000,
});
