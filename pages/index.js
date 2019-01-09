import Layout from '../components/Layout'
import fetch from 'node-fetch'
import React, { useState } from 'react'
import List from '../components/index/List'

const indexWrapper = {
  width: '1200px',
  display: 'block',
  margin: '0 auto',
  boxSizing: 'border-box',
  padding: '20px 0'
}

const Index = (props) => {
  const [list] = useState(props.list)
  return (
    <Layout title={'个人首页'}>
      <div style={indexWrapper}>
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
    ok: json.ok,
    list: json.list
  }
}

export default Index