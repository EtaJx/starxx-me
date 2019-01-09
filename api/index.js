const { parseHtml } = require('../lib/parseHtml')

module.exports = (router) => {
  const index = (ctx, next) => {
    const { index } = ctx.query
    const { resMds } = parseHtml({
      markdownPath: '_post'
    })
    ctx.body = {
      ok: true,
      article: resMds[index]
    }
  }

  const articleList = (ctx, next) => {
    const { listMds } = parseHtml({
      markdownPath: '_post'
    })
    ctx.body = {
      ok: true,
      list: listMds
    }
  }

  router.get('/api', index)
  router.get('/list', articleList)
  return router
}