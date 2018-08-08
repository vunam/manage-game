import * as Chance from 'chance';
import * as uniq from 'uniqid';
import {createPlayer} from '../services/players';
import {createTeam} from '../services/teams';

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
  sellValue: 1000000,
});

export const generateTeam = (userId, name, country) => ({
  id: uniq(),
  country: country || chance.country(),
  name,
  user: userId,
  money: 5000000,
  value: 20000000,
});

export const createTeamWithPlayers = async (userId, name, country) => {
  const newTeam = generateTeam(userId, name, country);

  createTeam(newTeam);

  const generatePlayerType = (type, total) =>
    new Array(total).fill({}).forEach(() => {
      const player = generatePlayer(newTeam.id, type);
      createPlayer(player);
    });

  generatePlayerType('Goal', 3);
  generatePlayerType('Def', 6);
  generatePlayerType('Mid', 6);
  generatePlayerType('Att', 5);

  return newTeam;
};
