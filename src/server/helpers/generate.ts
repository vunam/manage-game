import * as chance from 'chance';
import * as uniq from 'uniqid';

export const generatePlayer = (teamId) => ({
    id: uniq(),
    firstName: chance.first(),
    lastName: chance.last(),
    age: chance.integer({ min: 18, max: 40 }),
    country: chance.country(),
    value: 1000000,
    team: teamId,
  });
