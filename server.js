const Koa = require('koa')
const next = require('next')
const koaBody = require('koa-body')
const { CreateRouter } = require('./util/shootRouter')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const koa = new Koa()
  koa.use(koaBody())
  const router = new Router()

  //TODO 此处应有一个filter
  CreateRouter({ // api路由
    next: null,
    shooter: koa,
    routerPath: 'api',
    isNext: false
  })

  // TODO 此处可添加别名对应不同的page
  CreateRouter({ // 处理路由刷新页面404的情况
    next: app,
    shooter: router,
    routerPath: 'pages',
    isNext: true
  })
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  koa.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  koa.use(router.routes())
  koa.listen(8080, err => {
    if (err) {
      throw err
    } else {
      console.log(">Ready on http://localhost:8080")
    }
  })
})