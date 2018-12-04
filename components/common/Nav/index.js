import React, { Component } from 'react'
import Link from 'next/link'
import navs from 'constant/navs'
import './index.less'
import { withRouter } from 'next/router'

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props)
    // const timer = setTimeout(() => {
    //   clearTimeout(timer)
    //   document.getElementById('avatarWrapper').setAttribute('class', 'hing-div__nav__avatar avatar-animate')
    //   document.getElementById('avatar').setAttribute('class', 'avatar-animate')
    // }, 1000)
  }
  render() {
    return (
      <section className="hing-nav">
        <div className="hing-div__nav__avatar" id="avatarWrapper">
          <img src="/static/imgs/avatar.png" id="avatar"/>
        </div>
        <ul className="hing-ul__nav__group">
          {
            navs.map((nav, key) => {
              const { pathname } = this.props.router
              return (
                <li className={`hing-li__nav__item ${ pathname == nav.link ? 'active' : ''}`} key={key}>
                  <Link prefetch href={nav.link}><a>{nav.label}</a></Link>
                  <span className="numbers">24</span>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}

export default withRouter(Nav)