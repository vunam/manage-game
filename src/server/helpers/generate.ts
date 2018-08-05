import * as Chance from 'chance';
import * as uniq from 'uniqid';

const chance = new Chance();

export const generatePlayer = (teamId, type) => ({
    id: uniq(),
    firstName: chance.first(),
    lastName: chance.last(),
    age: chance.integer({ min: 18, max: 40 }),
    country: chance.country({ full: true }),
    value: 1000000,
    team: teamId,
    type,
    status: 'ACTIVE',
  });

export const generateTeam = (userId, name) => ({
  id: uniq(),
  country: chance.country({ full: true }),  
  name,
  user: userId,
  money: 5000000,
})