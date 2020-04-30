import React from 'react';
import Header from './common/Header'
import Nav from './common/Nav'
import { withRouter } from 'next/router'
import Head from 'next/head';
import Footer from './common/Footer';
import 'highlight.js/styles/atom-one-light.css';
import './style.less'

const Layout: React.FC<any> = (props: any) => {
  const { title, count } = props
  return (
    <>
      <div className="hing-div__wrapper">
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Header />
        <Nav {...count} />
        {props.children}
      </div>
      <Footer />
    </>
  )
};

export default withRouter(Layout)
