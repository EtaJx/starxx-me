const fs = require('fs')
const path = require('path')

const CreateRouter = (options) => {
  const { next, shooter, routerPath, isNext } = options
  const root = path.join(__dirname, '../')
  const files = fs.readdirSync(`${root}${routerPath}`)
  for (let file of files) {
    let fileName = path.basename(file, '.js')
    if(isNext) {
      // here shooter is router
      shooter.get(`/${fileName}`, async ctx => {
        await next.render(ctx.req, ctx.res, `/${fileName}`, ctx.query)
        ctx.response = false
      })
    } else {
      // here shooter is new Koa()
      shooter.use(require(`${root}${routerPath}/${fileName}.js`).routes())
    }
  }
}

module.exports = {
  CreateRouter
}