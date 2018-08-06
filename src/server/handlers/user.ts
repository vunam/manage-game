import * as uniq from 'uniqid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import getDb from '../helpers/db';
import {generatePlayer, generateTeam} from '../helpers/generate';

const db = getDb();

const SALT_ROUNDS = 10;
const SECRET = 'something';

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

export const postUserTokens = async ctx => {
  // verify access token
  const access = ctx.cookies.get('access_token');
  if (!access) {
    ctx.status = 401;
    ctx.body = {
      error: 'No access token',
    };
    return;
  }

  try {
    const decoded = jwt.verify(access, SECRET);

    ctx.body = {
      data: decoded,
    };
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      error: 'No access',
    };
  }
};

export const postLogout = async ctx => {
  ctx.cookies.set('access_token', null);

  ctx.body = {
    data: 'done',
  };
};

export const postUserLogin = async ctx => {
  const {
    body: {user, password},
  } = ctx.request;

  if (!user || !password) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  const userData = await db
    .get('users')
    .find({username: user})
    .value();

  if (!userData) {
    ctx.status = 401;
    ctx.body = {error: 'No user  found'};
    return;
  }

  const validated = await bcrypt
    .compare(password, userData.hashed)
    .then(res => res);

  if (!validated) {
    ctx.status = 401;
    ctx.body = {error: 'Password is incorrect'};
    return;
  }

  const team = await db
    .get('teams')
    .find({user: userData.id})
    .value();

  const data = {
    id: userData.id,
    role: userData.role,
    username: userData.username,
    team,
  };

  // TODO set jwt
  const token = jwt.sign(data, SECRET);
  ctx.cookies.set('access_token', token, {maxAge: 300000});

  ctx.body = {
    data,
  };
};

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

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
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
