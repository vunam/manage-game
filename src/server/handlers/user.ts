import * as bcrypt from 'bcrypt/bcrypt';
import * as uniq from 'uniqid';
import {generatePlayer, generateTeam} from '../helpers/generate';
import {showApiError, showApiResult} from '../helpers/response';
import {verifyAccess, setJwt} from '../helpers/authentication';
import {createPlayer} from '../services/players';
import {
  createTeam,
  findTeamByUser,
  updateTeamByUser,
  deleteTeamByUser,
} from '../services/teams';
import {
  createUser,
  findUserById,
  findUserByUsername,
  updateUserById,
  deleteUserById,
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

export const getUser = async ctx => {
  const {id} = ctx.params;

  const user = verifyAccess(ctx);
  const latestUserData = findUserById(user.id);

  if (latestUserData.role !== 'manager' && latestUserData.role !== 'admin') {
    return showApiError(ctx, 'Not allowed', 403);
  }

  if (id) {
    const team = findTeamByUser(id);
    const latestUser = findUserById(id);

    showApiResult(ctx, {
      id,
      username: latestUser.username,
      role: latestUser.role,
      team,
    });
  }
};

export const postUserTokens = async ctx => {
  const currentUser = verifyAccess(ctx);

  if (currentUser) {
    try {
      const team = findTeamByUser(currentUser.id);
      const latestUser = findUserById(currentUser.id);

      const data = {
        id: latestUser.id,
        role: latestUser.role,
        username: latestUser.username,
      };

      setJwt(ctx, data);
      showApiResult(ctx, {
        ...data,
        team,
      });
    } catch (e) {
      return showApiError(ctx, 'No access', 401);
    }
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
  const currentUser = verifyAccess(ctx);
  const latestUserData = findUserById(currentUser.id);

  const {
    body: {user, team, country, manage = false},
  } = ctx.request;

  const updateId = manage ? ctx.params.id : currentUser.id;

  if (!user || !team || !country) {
    return showApiError(ctx, 'Missing data', 422);
  }
  if (user.length < 3 || team.length < 3) {
    return showApiError(ctx, 'Username / team too short', 422);
  }

  const existing = findUserByUsername(user);

  if (manage) {
    if (latestUserData.role !== 'manager' && latestUserData.role !== 'admin') {
      return showApiError(ctx, 'Not allowed', 403);
    }

    if (latestUserData.role !== 'manager' && latestUserData.role !== 'admin') {
      return showApiError(ctx, 'Not allowed', 403);
    }
  } else if (existing && existing.username !== currentUser.username) {
    return showApiError(ctx, 'Username already exists', 422);
  }

  updateUserById(updateId, {username: user});

  const newTeam = updateTeamByUser(updateId, {country, name: team});

  const data = {
    id: updateId,
    role: currentUser.role,
    username: user,
  };

  if (!manage) setJwt(ctx, data);

  showApiResult(ctx, {
    ...data,
    team: newTeam,
  });
};

export const deleteUser = async ctx => {
  const {id} = ctx.params;

  const user = verifyAccess(ctx);
  const latestUserData = findUserById(user.id);

  if (id === user.id) {
    return showApiError(ctx, 'Not allowed to delete yourself', 403);
  }

  if (latestUserData.role !== 'manager' && latestUserData.role !== 'admin') {
    return showApiError(ctx, 'Not allowed', 403);
  }

  deleteTeamByUser(id);
  deleteUserById(id);

  showApiResult(ctx, 'success');
};
