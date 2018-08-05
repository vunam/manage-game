import * as Koa from 'koa';
import * as send from 'koa-send';
import * as Router from 'koa-router';
import * as path from "path";
import { getPlayers } from "./handlers/players";
import htmlPage from './html';

const app = new Koa();

const router = new Router();

app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/assets/bundle.js')) {
    return send(ctx, path.join('built', 'server', 'frontend', 'index.js'));
  }

  return next();
})

router.get('/api/players', getPlayers);
router.get('/api/user', getPlayers);
router.get('/*', (ctx) => {
  ctx.body = htmlPage();
});

app.use(router.routes())

app.listen(5000, () => console.log('Server started'));
