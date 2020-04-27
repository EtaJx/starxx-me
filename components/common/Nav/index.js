import React, { Component } from 'react'
import { navs } from 'config/navs.config';
import './index.less'
import { withRouter } from 'next/router'

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="hing-nav">
        <div className="hing-div__nav__avatar" id="avatarWrapper">
          <img src="/static/imgs/avatar.png" id="avatar" />
        </div>
        <ul className="hing-ul__nav__group">
          {
            navs.map((nav, key) => {
              const { pathname } = this.props.router
              return (
                <li className={`hing-li__nav__item ${pathname === nav.link ? 'active' : ''}`} key={key}>
                  <a href={nav.link}>{nav.label}<span className="numbers">{this.props[nav.key]}</span></a>
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
