import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React, { Component } from 'react'
import '../lib/prism/prism.js'
import '../lib/prism/prism.css'

class Index extends Component {
  static async getInitialProps() {
    const res = await fetch(`http://localhost:8080/api`)
    const json = await res.json()
    return {
      ok: json.ok,
      articles: json.articles
    }
  }
  render() {
    const { articles } = this.props
    return (
      <Layout>
        <header>
          <h3 style={{
            textAlign: 'center'
          }} dangerouslySetInnerHTML={{ __html: articles[0].header.title }}></h3>
        </header>
        <div style={{
          padding: '0 10px'
        }} dangerouslySetInnerHTML={{ __html: articles[0].html }}></div>
      </Layout>
    )
  }
}

export default Index