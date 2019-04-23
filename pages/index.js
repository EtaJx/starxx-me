import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React from 'react'
import 'static/index.less'
import List from '../components/index/List'
import Search from '../components/index/Search'

const Index = (props) => {
  const { list } = props
  return (
    <Layout title={'个人首页'} count={{
      article: list.length
    }}>
      <div className="hing-div__index__wrapper">
        <Search />
        <List list={list} />
      </div>
    </Layout>
  )
}

Index.getInitialProps = async ({ req }) => {
  const baseUrl = `http://${req.headers['host']}`
  const res = await fetch(`${baseUrl}/list`)
  const json = await res.json()
  return {
    list: json.list
  }
}

export default Index