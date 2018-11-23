import React, { Component } from 'react'
import './index.less'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      document.getElementById('header').setAttribute('class', 'hing-header contract-animate')
    }, 1000)
  }
  render() {
    return (
      <header className="hing-header" id="header">
        <img src="https://pbs.twimg.com/profile_banners/4113677664/1519964154/1500x500" />
      </header>
    )
  }
}

export default Header