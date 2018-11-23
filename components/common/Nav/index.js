import React, { Component } from 'react'
import Link from 'next/link'
import navs from 'constant/navs'
import './index.less'

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      document.getElementById('avatarWrapper').setAttribute('class', 'hing-div__nav__avatar avatar-animate')
      document.getElementById('avatar').setAttribute('class', 'avatar-animate')
    }, 1000)
  }
  render() {
    return (
      <section className="hing-nav">
        <div className="hing-div__nav__avatar" id="avatarWrapper">
          <img src="https://pbs.twimg.com/profile_images/1022743906302062592/8pz672JW_400x400.jpg" id="avatar"/>
        </div>
        <ul className="hing-ul__nav__group">
          {
            navs.map((nav, key) => {
              return (
                <li className={`hing-li__nav__item ${key == 0 ? 'active' : ''}`} key={key}>
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

export default Nav