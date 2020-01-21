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
    const { content: postContent, list: postList } = parseHtml({
      markdownPath: '_post'
    });
    const { content: filesContent, list: filesList } = parseHtml({
      markdownPath: '_files'
    });
    const contents = [...sort(postContent, 'content').reverse(), ...filesContent];
    ctx.body = {
      article: contents[index],
      articleCounts: postList.length + filesList.length // 文章数量
    };
  };

  const articleList = (ctx) => {
    const { list: postList } = parseHtml({
      markdownPath: '_post'
    });
    const { list: fileList } = parseHtml({
      markdownPath: '_files'
    });
    const sortedPostList = sort(postList, 'list');
    ctx.body = {
      list: [...sortedPostList.reverse(), ...fileList]
    };
  };

  const getResume = (ctx) => {
    const key = fs.readFileSync(`${rootPath}/key`).toString().split(' ')[0];
    let infomation = info();
    infomation.data.intro.forEach(item => {
      if (!isNaN(item.val)) { // 如果是电话号码
        item.val = handleXOR(item.val, key)
      }
      return item
    });
    ctx.body = {
      info: infomation
    };
  };

  router.get('/api', index);
  router.get('/list', articleList);
  router.get('/resume', getResume);
  return router
};
