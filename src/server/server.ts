import * as Koa from 'koa';
import * as body from 'koa-body';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as path from 'path';
import {getMessages} from './handlers/messages';
import {
  deletePlayer,
  getPlayer,
  getPlayers,
  postAddTransfer,
  postCreatePlayer,
  postTransaction,
  putPlayer,
} from './handlers/players';
import {getTeams} from './handlers/teams';
import {
  deleteUser,
  getUser,
  postLogout,
  postUserCreate,
  postUserLogin,
  postUserTokens,
  putUserUpdate,
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

/* Routes */

router.get('/api/messages/:team', getMessages);
router.get('/api/teams', getTeams);

router.post('/api/players/create', postCreatePlayer);
router.delete('/api/players/:id', deletePlayer);
router.get('/api/players/:id', getPlayer);
router.put('/api/players/:id', putPlayer);
router.get('/api/players', getPlayers);
router.post('/api/players/:id/transfer', postAddTransfer);
router.post('/api/players/:id/transaction/:team', postTransaction);

router.get('/api/user/:id', getUser);
router.post('/api/user/create', postUserCreate);
router.put('/api/user/:id', putUserUpdate);
router.delete('/api/user/:id', deleteUser);
router.post('/api/user/login', postUserLogin);
router.post('/api/user/tokens', postUserTokens);
router.post('/api/user/logout', postLogout);

router.get('/*', ctx => {
  ctx.body = htmlPage();
});

app.use(router.routes());

app.listen(5000, () =>
  // tslint:disable-next-line
  console.log('Server started on port 5000, proxy on http://localhost:9000'),
);
