import * as uniq from 'uniqid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {generatePlayer, generateTeam} from '../helpers/generate';
import {createTeam, findTeamByUser, updateTeamByUser} from '../services/teams';
import {
  createUser,
  findUserByUsername,
  updateUserById,
} from '../services/users';
import {createPlayer} from '../services/players';

const SALT_ROUNDS = 10;
const SECRET = 'something';

const createNewTeam = async (userId, name, country) => {
  const newTeam = generateTeam(userId, name, country);

  createTeam(newTeam);

  const generatePlayerType = (type, total) =>
    new Array(total).fill({}).forEach(() => {
      const player = generatePlayer(newTeam.id, type);
      createPlayer(player);
    });

  generatePlayerType('GOALKEEPER', 3);
  generatePlayerType('DEFENDER', 6);
  generatePlayerType('MIDFIELDER', 6);
  generatePlayerType('ATTACKER', 5);

  return newTeam;
};

const setJwt = (ctx, data) => {
  const token = jwt.sign(data, SECRET);
  ctx.cookies.set('access_token', token, {maxAge: 30000000});

  return token;
};

const verifyAccess = ctx => {
  const access = ctx.cookies.get('access_token');
  if (!access) {
    ctx.status = 401;
    ctx.body = {
      error: 'No access token',
    };
    return false;
  }

  try {
    return jwt.verify(access, SECRET);
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      error: 'No access',
    };
    return false;
  }
};

export const postUserTokens = async ctx => {
  const decoded = verifyAccess(ctx);

  if (decoded) {
    ctx.body = {
      data: decoded,
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

  const userData = findUserByUsername(user);

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

  const team = findTeamByUser(userData.id);

  const data = {
    id: userData.id,
    role: userData.role,
    username: userData.username,
    team,
  };

  setJwt(ctx, data);

  const token = (ctx.body = {
    data,
  });
};

export const postUserCreate = async ctx => {
  const {
    body: {user, team, password, country},
  } = ctx.request;

  if (!user || !team || !password || !country) {
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
    country,
    role: 'owner',
  };

  const newTeam = await createNewTeam(uniqId, team, country);
  createUser(uniqId, user, hashed, newTeam.id);

  const data = {
    id: userData.id,
    role: userData.role,
    username: userData.username,
    team: newTeam,
  };

  setJwt(ctx, data);

  ctx.body = {data};
};

export const postUserUpdate = async ctx => {
  const decoded = verifyAccess(ctx);
  const {
    body: {user, team, country},
  } = ctx.request;

  if (!user || !team || !country) {
    ctx.status = 422;
    ctx.body = {error: 'Missing data'};
    return;
  }

  if (user.length < 3 || team.length < 3) {
    ctx.status = 422;
    ctx.body = {error: 'username / team too short'};
    return;
  }
  updateUserById(decoded.id, {username: user});

  const newTeam = updateTeamByUser(decoded.id, {country: country, name: team});

  const data = {
    id: decoded.id,
    role: decoded.role,
    username: user,
    team: newTeam,
  };

  setJwt(ctx, data);

  ctx.body = {data};
};
