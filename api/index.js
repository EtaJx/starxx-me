const router = new require('koa-router')()
const fs = require('fs')
const path = require('path')
const markdown = require( "markdown" ).markdown

const index = (ctx, next) => {
  const mdPath = path.join(__dirname, '../_post')
  const mds = fs.readdirSync(`${mdPath}`)
  let resMds = []
  for(let md of mds) {
    const file = fs.readFileSync(`${mdPath}/${md}`, 'utf8')
    resMds.push(markdown.toHTML(file))
  }
  ctx.body= {
    ok: true,
    articles: resMds
  }
}

router.get('/api', index)

module.exports = router