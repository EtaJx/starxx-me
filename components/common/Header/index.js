import React, { Component } from 'react'
import './index.less'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="hing-header">
        <img src="https://pbs.twimg.com/profile_banners/4113677664/1519964154/1500x500" />
      </header>
    )
  }
}

export default Header