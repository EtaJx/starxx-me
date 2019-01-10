const { parseHtml } = require('../lib/parseHtml')
const sort = require('../lib/sort')

module.exports = (router) => {
  const index = (ctx) => {
    const { index } = ctx.query
    const { content } = parseHtml({
      markdownPath: '_post'
    })
    const sortedContent = sort(content, 'content')
    ctx.body = {
      ok: true,
      article: sortedContent.reverse()[index]
    }
  }

  const articleList = (ctx) => {
    const { list } = parseHtml({
      markdownPath: '_post'
    })
    const sortedList = sort(list, 'list')
    ctx.body = {
      ok: true,
      list: sortedList.reverse()
    }
  }

  router.get('/api', index)
  router.get('/list', articleList)
  return router
}