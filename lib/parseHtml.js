const fs = require('fs');
const moment = require('moment');
const path = require('path');
const cheerio = require('cheerio');
const yaml2js = require('js-yaml');
const marked = require('marked');
const BLACK_LIST = ['meijian', 'mj', '公司', 'meijian-development', '公司相关', 'login', '转正']; // 这样就没意思了，想办法变通一下过滤方法

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, language) => {
    const hljs = require('highlight.js');
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const parseHtml = ({ markdownPath }) => {
  const mdsPath = path.join(__dirname, `../${markdownPath}`);
  const mds = fs.readdirSync(`${mdsPath}`);
  const markdownActions = {
    _post: (htmlDOM) => {
      const header = yaml2js.load(htmlDOM('code').first().text());
      htmlDOM('code').first().remove();
      return header;
    }
  }
  let content = [];
  let list = [];
  for (let md of mds) {
    const fileContent = fs.readFileSync(`${mdsPath}/${md}`, 'utf8');
    const fileName = path.basename(md, '.md');
    const parsedHtml = marked(fileContent);
    const $ = cheerio.load(parsedHtml);
    if ($('pre').length) {
      $('pre').attr('style', 'overflow: scroll; background-color: #FCFAF2;');
    }

    let header;
    if (markdownPath === '_post') {
      header = markdownActions[markdownPath]($);
    } else if (markdownPath === '_files' && fileName && !BLACK_LIST.includes(fileName) ) {
      header = {
        title: fileName,
        date: moment().format('YYYY-MM-DD hh:mm:ss')
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
