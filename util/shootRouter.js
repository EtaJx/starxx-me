const fs = require('fs')
const path = require('path')

const CreateRouter = (options) => {
  const { next, router } = options
  const root = path.join(__dirname, '../')
  const files = fs.readdirSync(`${root}/pages`)
  for (let file of files) {
    let fileName = path.basename(file, '.js')
    router.get(`/${fileName}`, async ctx => {
      await next.render(ctx.req, ctx.res, `/${fileName}`, ctx.query)
      ctx.response = false
    })
  }
}

module.exports = {
  CreateRouter
}