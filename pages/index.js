import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React, { Component } from 'react'
import List from '../components/index/List'

const indexWrapper = {
  width: '1200px',
  display: 'block',
  margin: '0 auto',
  boxSizing: 'border-box',
  padding: '20px 0'
}

class Index extends Component {
  static async getInitialProps() {
    const res = await fetch(`http://localhost:8080/list`)
    const json = await res.json()
    return {
      ok: json.ok,
      list: json.list
    }
  }
  render() {
    const { list } = this.props
    return (
      <Layout>
        <div style={indexWrapper}>
          <List list={list}/>
        </div>
      </Layout>
    )
  }
}

export default Index