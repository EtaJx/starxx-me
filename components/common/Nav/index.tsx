import React from 'react';
import { navs, NavItem } from 'config/navs.config';
import { NextRouter } from 'next/router';
import './index.less'
import { withRouter } from 'next/router'

type NavProps = {
  router: NextRouter,
  navs: NavItem[],
  count: number,
  [navKey: string]: any
}

const Nav: React.FC<NavProps> = props => {
  const { router } = props;
  return (
    <section className="hing-nav">
      <div className="hing-div__nav__avatar" id="avatarWrapper">
        <img src="/static/imgs/avatar.png" id="avatar" />
      </div>
      <ul className="hing-ul__nav__group">
        {
          navs.map((nav, key) => {
            const { pathname } = router
            const navKey = nav.key;
            return (
              <li className={`hing-li__nav__item ${pathname === nav.link ? 'active' : ''}`} key={key}>
                <a href={nav.link}>{nav.label}<span className="numbers">{props[navKey]}</span></a>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default withRouter(Nav)
