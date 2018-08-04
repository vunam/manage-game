import * as Koa from 'koa';
import * as send from 'koa-send';
import * as path from "path";
import htmlPage from './html';

const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/assets/bundle.js')) {
    return send(ctx, path.join('built', 'server', 'frontend', 'index.js'));
  }

  return next();
})

app.use((ctx, next) => {
  ctx.body = htmlPage();
})

app.listen(5000, () => console.log('Server started'));
