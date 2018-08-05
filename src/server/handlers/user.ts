import * as uniq from 'uniqid';
import * as bcrypt from 'bcrypt';
import getDb from '../helpers/db';

const saltRounds = 10;

export const postSignup = async ctx => {
  const {body} = ctx.request;

  const db = getDb();

  const hashed = await bcrypt.hash(body.password, saltRounds);
  
  const user = {
    id: uniq(),
    username: body.user,
    team: body.team,
  };

  await db.get('users')
    .push({ ...user, hashed })
    .write();

  ctx.body = {
    meta: {},
    data: user,
  };
};
