import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React from 'react'
import moment from 'moment'
import 'static/content.less'

const Content = (props) => {
  const { article, articleCounts } = props
  const { title, date, html } = article
  return (
    <Layout title={title} count={{
      article: articleCounts
    }}>
      <header className="content-header">
        <h4>{title}</h4>
      </header>
      <div className='content'>
        <span className="content-time">{moment(date).utc().format('YYYY-MM-DD hh:mm:ss')}</span>
        <div dangerouslySetInnerHTML={{
          __html: html
        }} />
      </div>
    </Layout>
  )
}

Content.getInitialProps = async ({ req, query }) => {
  const { token } = query
  const baseURL = `http://${req.headers['host']}`
  const res = await fetch(`${baseURL}/api?token=${token}`)
  const { article, articleCounts } = await res.json()
  return {
    article, articleCounts
  }
}

export default Content
