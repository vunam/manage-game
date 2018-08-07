import * as jwt from 'jsonwebtoken';
import {showApiError} from './response';

export const verifyAccess = ctx => {
  const access = ctx.cookies.get('access_token');
  if (!access) {
    showApiError(ctx, 'No access token', 401);
    return false;
  }

  try {
    return jwt.verify(access, process.env.JWT_SECRET);
  } catch (e) {
    showApiError(ctx, 'No access', 401);
    return false;
  }
};

export const setJwt = (ctx, data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  ctx.cookies.set('access_token', token, {maxAge: 30000000});

  return token;
};
