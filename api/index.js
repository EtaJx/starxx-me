const router = new require('koa-router')()
const { parseHtml } = require('../lib/parseHtml')

const index = (ctx, next) => {
  const articles = parseHtml({
    markdownPath: '_post'
  })
  ctx.body= {
    ok: true,
    articles: articles
  }
}

router.get('/api', index)

module.exports = router