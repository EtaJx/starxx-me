import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React from 'react'
import moment from 'moment'
import 'static/content.less'

const Content = (props) => {
  const { article, articleCounts } = props
  const { header: { title, tags = [], categories, date } } = article
  return (
    <Layout title={title} count={{
      article: articleCounts
    }}>
      <header className="content-header">
        <h4>{title}</h4>
      </header>
      <div className='content'>
        <span className="content-time">{moment(date).utc().format('YYYY-MM-DD hh:mm:ss')}</span>
        {/* <div className="content-category">
          {
            categories.map((category, index) => (
              <span className="content-category" key={index}>{category}</span>
            ))
          }
        </div> */}
        <div className="content-tag">
          {
            tags.map((tag, index) => (
              <span key={index}>{`#${tag}`}</span>
            ))
          }
        </div>

        <div dangerouslySetInnerHTML={{
          __html: article.html
        }} />
      </div>
    </Layout>
  )
}

Content.getInitialProps = async ({ req, query }) => {
  const { index } = query
  const baseURL = `http://${req.headers['host']}`
  const res = await fetch(`${baseURL}/api?index=${index}`)
  const { article, articleCounts } = await res.json()
  return {
    article, articleCounts
  }
}

export default Content
