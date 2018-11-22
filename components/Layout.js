import React, { Component } from 'react'
import Header from './common/Header'
import Nav from './common/Nav'

import './style.less'

const Layout = (props) => {
  return (
    <div className="hing-div__wrapper">
      <Header />
      <Nav />
      {props.children}
    </div>
  )
}

export default Layout