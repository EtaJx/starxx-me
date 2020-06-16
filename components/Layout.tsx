import React from 'react';
import Header from './common/Header'
import Nav from './common/Nav'
import { withRouter, NextRouter } from 'next/router'
import Head from 'next/head';
import Footer from './common/Footer';
import 'highlight.js/styles/atom-one-light.css';
import './style.less'

type LayoutProps = {
  title: string,
  count: number,
  router: NextRouter
}

const Layout: React.FC<LayoutProps> = props => {
  const { title, count } = props
  return (
    <>
      <div className="hing-div__wrapper">
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0;" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-165881979-1" />
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-165881979-1');
            `}
          </script>
        </Head>
        <Header />
        <Nav count={count} />
        {props.children}
      </div>
      <Footer />
    </>
  )
};



export default withRouter(Layout);
