import React from 'react';
import './style/header.less';
import { md5 } from '../../lib/md5'

class Header extends React.Component {
  render() {
    const { intro } = this.props;
    return (
      <header className="hing-header__wrapper">
        <img className="hing-img__avatar" src="../../static/imgs/avatar.jpg" alt="我自己" />
        <div className="hing-div__intro">
          <dl className="hing-dl__group">
            {intro.map((item) => {
              console.log(item.val)
              if(!isNaN(Number(item.val))) {
                item.val = md5(item.val, 122)
              }
              return <dd className="hing-dd__item" key={item.key} dangerouslySetInnerHTML={{ __html: item.val }}></dd>
            })}
          </dl>
        </div>
      </header>
    );
  }
}

export default Header;
