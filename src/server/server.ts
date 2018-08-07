import * as Koa from 'koa';
import * as body from 'koa-body';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as path from 'path';
import {getPlayers, postAddTransfer, postTransaction} from './handlers/players';
import {getTeams} from './handlers/teams';
import {
  postLogout,
  postUserCreate,
  postUserLogin,
  postUserTokens,
  postUserUpdate,
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

// Routes

router.get('/api/teams', getTeams);

router.get('/api/players', getPlayers);
router.post('/api/players/:id/transfer', postAddTransfer);
router.post('/api/players/:id/transaction/:team', postTransaction);

router.post('/api/user/create', postUserCreate);
router.post('/api/user/update', postUserUpdate);
router.post('/api/user/login', postUserLogin);
router.post('/api/user/tokens', postUserTokens);
router.post('/api/user/logout', postLogout);

router.get('/*', ctx => {
  ctx.body = htmlPage();
});

app.use(router.routes());

// tslint:disable-next-line
app.listen(5000, () => console.log('Server started'));
