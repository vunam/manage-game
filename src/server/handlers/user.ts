import * as bcrypt from 'bcrypt/bcrypt';
import * as uniq from 'uniqid';
import {generatePlayer, generateTeam} from '../helpers/generate';
import {showApiError, showApiResult} from '../helpers/response';
import {verifyAccess, setJwt} from '../helpers/authentication';
import {createPlayer} from '../services/players';
import {createTeam, findTeamByUser, updateTeamByUser} from '../services/teams';
import {
  createUser,
  findUserById,
  findUserByUsername,
  updateUserById,
} from '../services/users';

const createNewTeam = async (userId, name, country) => {
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

export const postUserTokens = async ctx => {
  const decoded = verifyAccess(ctx);

  if (decoded) {
    const team = findTeamByUser(decoded.id);
    const latestUser = findUserById(decoded.id);

    showApiResult(ctx, {id: decoded.id, username: latestUser.username, role: latestUser.role, team});
  }
};

export const postLogout = async ctx => {
  ctx.cookies.set('access_token', null);
  showApiResult(ctx, 'done');
};

export const postUserLogin = async ctx => {
  const {
    body: {user, password},
  } = ctx.request;

  if (!user || !password) {
    return showApiError(ctx, 'Missing data', 422);
  }

  const userData = findUserByUsername(user);

  if (!userData) {
    return showApiError(ctx, 'No user  found', 401);
  }

  const validated = await bcrypt
    .compare(password, userData.hashed)
    .then(res => res);

  if (!validated) {
    return showApiError(ctx, 'Password is incorrect', 401);
  }

  const team = findTeamByUser(userData.id);

  const data = {
    id: userData.id,
    role: userData.role,
    username: userData.username,
  };

  setJwt(ctx, data);
  showApiResult(ctx, {...data, team});
};

export const postUserCreate = async ctx => {
  const {
    body: {user, team, password, country, manage = false},
  } = ctx.request;

  if (!user || !team || !password || !country) {
    return showApiError(ctx, 'Missing data', 422);
  }

  if (password.length < 3 || user.length < 3 || team.length < 3) {
    ctx.status = 422;
    ctx.body = {error: 'Password / username / team too short'};
    return;
  }

  const existing = findUserByUsername(user);

  if (existing) {
    return showApiError(ctx, 'Username already exists', 422);
  }

  const hashed = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
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
  };

  if (!manage) setJwt(ctx, data);

  showApiResult(ctx, {...data, team: newTeam});
};

export const putUserUpdate = async ctx => {
  const decoded = verifyAccess(ctx);
  const {
    body: {user, team, country},
  } = ctx.request;

  if (!user || !team || !country) {
    return showApiError(ctx, 'Missing data', 422);
  }
  if (user.length < 3 || team.length < 3) {
    return showApiError(ctx, 'Username / team too short', 422);
  }

  const existing = findUserByUsername(user);

  if (existing && existing.username !== decoded.username) {
    return showApiError(ctx, 'Username already exists', 422);
  }

  updateUserById(decoded.id, {username: user});

  const newTeam = updateTeamByUser(decoded.id, {country, name: team});

  const data = {
    id: decoded.id,
    role: decoded.role,
    username: user,
  };

  setJwt(ctx, data);
  showApiResult(ctx, {
    ...data,
    team: newTeam,
  });
};
