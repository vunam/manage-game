import * as Koa from 'koa';
import * as send from 'koa-send';
import * as body from 'koa-body';
import * as Router from 'koa-router';
import * as path from 'path';
import {getTeams} from './handlers/teams';
import {getPlayers, postAddTransfer} from './handlers/players';
import {
  postUserLogin,
  postUserTokens,
  postUserCreate,
  postUserUpdate,
  postLogout,
} from './handlers/user';
import htmlPage from './html';

const app = new Koa();

const router = new Router();

app.use(body());
app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/assets/bundle.js')) {
    return send(ctx, path.join('built', 'server', 'frontend', 'index.js'));
  }

  return next();
});

router.get('/api/teams', getTeams);

router.get('/api/players', getPlayers);
router.post('/api/players/:id/transfer', postAddTransfer);

router.post('/api/user/create', postUserCreate);
router.post('/api/user/update', postUserUpdate);
router.post('/api/user/login', postUserLogin);
router.post('/api/user/tokens', postUserTokens);
router.post('/api/user/logout', postLogout);

router.get('/*', ctx => {
  ctx.body = htmlPage();
});

app.use(router.routes());

app.listen(5000, () => console.log('Server started'));
