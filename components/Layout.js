import Header from './common/Header'
import Nav from './common/Nav'
import { withRouter } from 'next/router'
import Head from 'next/head';
import React from 'react'
import './style.less'

const Layout = (props) => {
  const { title } = props
  return (
    <div className="hing-div__wrapper">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Nav />
      {props.children}
    </div>
  )
}

export default withRouter(Layout)