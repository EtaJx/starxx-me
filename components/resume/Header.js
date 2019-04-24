import React from 'react';
import './style/header.less';

class Header extends React.Component {
  render() {
    const { intro } = this.props;
    return (
      <header className="hing-header__wrapper">
        <img className="hing-img__avatar" src="../../static/imgs/avatar.jpg" alt="我自己" />
        <div className="hing-div__intro">
          <dl className="hing-dl__group">
            {intro.map((val) => (
              <dd className="hing-dd__item" key={val.key} dangerouslySetInnerHTML={{ __html: val.val }}></dd>
            ))}
          </dl>
        </div>
      </header>
    );
  }
}

export default Header;