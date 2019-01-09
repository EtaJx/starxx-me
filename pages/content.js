import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React, { useState } from 'react'
import '../lib/prism/prism.css'
import '../lib/prism/prism'
import 'static/content.less'

const Content = (props) => {
  const { article } = props
  const [content] = useState(article)
  const { header: { title, tags, categories, date } } = content
  return (
    <Layout>
      <header className="content-header">
        <h4>{title}</h4>
      </header>
      <div dangerouslySetInnerHTML={{
        __html: content.html
      }} className='content'></div>
    </Layout>
  )
}

Content.getInitialProps = async ({ req, query }) => {
  const { index } = query
  const baseURL = `http://${req.headers['host']}`
  const res = await fetch(`${baseURL}/api?index=${index}`)
  const { ok, article } = await res.json()
  return {
    ok, article
  }
}

export default Content