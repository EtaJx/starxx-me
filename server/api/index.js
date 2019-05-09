const { parseHtml } = require('../../lib/parseHtml');
const sort = require('../../lib/sort');
const info = require('../../lib/parseResumeYaml');
const { handleXOR } = require('../../lib/encrypt');
const fs = require('fs');
const path = require('path');
const rootPath = path.join(__dirname, '../../');

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
    const key = fs.readFileSync(`${rootPath}/key`).toString().split(' ')[0]
    let infomation = info()
    infomation.data.intro.forEach(item => {
      if (!isNaN(item.val)) { // 如果是电话号码
        item.val = handleXOR(item.val, key)
      }
      return item
    })
    ctx.body = {
      info: infomation
    };
  };

  router.get('/api', index);
  router.get('/list', articleList);
  router.get('/resume', getResume);
  return router
}