const router = new require('koa-router')()
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const yaml2js = require('js-yaml')
const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix:   'language-'
});

const index = (ctx, next) => {
  const mdPath = path.join(__dirname, '../_post')
  const mds = fs.readdirSync(`${mdPath}`)
  let resMds = []
  for(let md of mds) {
    const file = fs.readFileSync(`${mdPath}/${md}`, 'utf8')
    const html = markdown.render(file)
    const $ = cheerio.load(html)
    const header = yaml2js.load($('code').first().html())
    $('code').first().remove()
    resMds.push({
      header,
      html: $.html()
    })
  }
  ctx.body= {
    ok: true,
    articles: resMds
  }
}

router.get('/api', index)

module.exports = router