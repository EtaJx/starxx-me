const { parseHtml } = require('../lib/parseHtml');
const sort = require('../lib/sort');
const info = require('../lib/parseResumeYaml');

module.exports = (router) => {
  const index = (ctx) => {
    const { index } = ctx.query;
    const { content, list } = parseHtml({
      markdownPath: '_post'
    });
    const sortedContent = sort(content, 'content');
    ctx.body = {
      article: sortedContent.reverse()[index],
      articleCounts: list.length // 文章数量
    };
  };

  const articleList = (ctx) => {
    const { list } = parseHtml({
      markdownPath: '_post'
    });
    const sortedList = sort(list, 'list');
    ctx.body = {
      list: sortedList.reverse()
    };
  };

  const getResume = (ctx) => {
    ctx.body = {
      info: info()
    };
  };

  router.get('/api', index);
  router.get('/list', articleList);
  router.get('/resume', getResume);
  return router
}