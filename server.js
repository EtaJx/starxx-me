const Koa = require('koa');
const next = require('next');
const koaBody = require('koa-body');
const { CreateRouter } = require('./lib/shootRouter');
const filter = require('./server/filter/index');
const Router = require('koa-router');
const { initGD } = require('./lib/GoogleDriveAPI');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const koa = new Koa();
const router = new Router();
koa.use(koaBody());
koa.use(filter());

CreateRouter({
  next: koa,
  shooter: router,
  routerPath: 'server/api',
  isNext: false
});

initGD();

app.prepare().then(() => {
  CreateRouter({ // 处理路由刷新页面404的情况
    next: app,
    shooter: router,
    routerPath: 'pages',
    isNext: true
  });
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  });

  koa.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  });

  koa.use(router.routes());

  koa.listen(process.env.PORT || 8080, err => {
    if (err) {
      throw err
    } else {
      console.log(`>Ready on http://localhost:${process.env.PORT || 8080}`)
    }
  });
});
