const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const yaml2js = require('js-yaml')
const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'language-'
})
const parseHtml = ({
  markdownPath
}) => {
  const mdsPath = path.join(__dirname, `../${markdownPath}`)
  const mds = fs.readdirSync(`${mdsPath}`)
  let resMds = []
  for(let md of mds) {
    const file = fs.readFileSync(`${mdsPath}/${md}`, 'utf8')
    const html = markdown.render(file)
    const $ = cheerio.load(html)
    const header = yaml2js.load($('code').first().html())
    $('code').first().remove()
    resMds.push({
      header,
      html: $.html()
    })
  }
  return resMds
}

module.exports = {
  parseHtml
}