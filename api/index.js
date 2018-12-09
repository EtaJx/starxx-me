const router = new require('koa-router')()
const { parseHtml } = require('../lib/parseHtml')

const index = (ctx, next) => {
  const { resMds } = parseHtml({
    markdownPath: '_post'
  })
  ctx.body = {
    ok: true,
    articles: resMds
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

module.exports = router