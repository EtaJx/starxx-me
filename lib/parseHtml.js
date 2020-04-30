const fs = require('fs');
const moment = require('moment');
const path = require('path');
const cheerio = require('cheerio');
const yaml2js = require('js-yaml');
const marked = require('marked');
const { fetchFileContent } = require('../lib/GoogleDriveAPI');

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

const parseHtml = originContent => {
  // const markdownActions = {
  //   _post: (htmlDOM) => {
  //     const header = yaml2js.load(htmlDOM('code').first().text());
  //     htmlDOM('code').first().remove();
  //     return header;
  //   }
  // }
  const parsedHtml = marked(originContent);
  const $ = cheerio.load(parsedHtml);
  if ($('pre').length) {
    $('pre').attr('style', 'overflow: scroll; background-color: #FCFAF2;');
  }
  return $.html();
};

const parseContent = async id => {
  const { name, modifiedTime, content } = await fetchFileContent(id);
  return {
    title: name,
    date: modifiedTime,
    html: parseHtml(content)
  };
}

module.exports = {
  parseHtml,
  parseContent
};
