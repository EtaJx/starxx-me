const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const yaml2js = require('js-yaml')
const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'language-'
});
const BLACK_LIST = ['meijian', 'mj', '公司', 'meijian-development', '公司相关', 'login', '转正']; // 这样就没意思了，想办法变通一下过滤方法
const parseHtml = ({ markdownPath }) => {
  const mdsPath = path.join(__dirname, `../${markdownPath}`);
  const mds = fs.readdirSync(`${mdsPath}`);
  let content = [];
  let list = [];
  for (let md of mds) {
    const file = fs.readFileSync(`${mdsPath}/${md}`, 'utf8');
    const fileName = path.basename(md, '.md');
    const html = markdown.render(file);
    const $ = cheerio.load(html);
    let header;
    if (markdownPath === '_post') {
      header = yaml2js.load($('code').first().text());
      $('code').first().remove();
    } else if (markdownPath === '_files' && !BLACK_LIST.includes(fileName) ) {
      header = {
        title: path.basename(md, '.md'),
        date: new Date()
      };
    } else {
      continue;
    }
    list.push(header);
    content.push({
      header,
      html: $.html()
    })
  }
  return {
    list,
    content
  }
};

module.exports = {
  parseHtml
};
