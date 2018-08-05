import * as uniq from 'uniqid';
import * as bcrypt from 'bcrypt';
import getDb from '../helpers/db';
import {generatePlayer, generateTeam} from '../helpers/generate';

const db = getDb();

const saltRounds = 10;

const createUser = async (
  id,
  username,
  hashed,
  team = null,
  role = 'owner',
) => {
  await db
    .get('users')
    .push({
      id,
      username,
      team,
      hashed,
      role,
    })
    .write();
};

const createTeam = async (userId, name) => {
  const newTeam = generateTeam(userId, name);

  await db
    .get('teams')
    .push(newTeam)
    .write();

  const generatePlayerType = (type, total) =>
    new Array(total).fill({}).forEach(() => {
      const player = generatePlayer(newTeam.id, type);
      db.get('players')
        .push(player)
        .write();
    });

  generatePlayerType('GOALKEEPER', 3);
  generatePlayerType('DEFENDER', 6);
  generatePlayerType('MIDFIELDER', 6);
  generatePlayerType('ATTACKER', 5);

  return newTeam;
};

export const postLogin = async ctx => {
  
}

export const postUserCreate = async ctx => {
  const {
    body: {user, team, password},
  } = ctx.request;

  if (!user || !team || !password) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  if (password.length < 3 || user.length < 3 || team.length < 3) {
    ctx.status = 422;
    ctx.body = {error: 'Password / username / team too short'};
    return;
  }

  // TODO check if user exists?

  const hashed = await bcrypt.hash(password, saltRounds);
  const uniqId = uniq();
  const userData = {
    id: uniqId,
    username: user,
  };

  const newTeam = await createTeam(uniqId, team);
  await createUser(uniqId, user, hashed, newTeam.id);

  // JWT here

  ctx.body = {
    data: {
      ...userData,
      team: newTeam,
    },
  };
};
