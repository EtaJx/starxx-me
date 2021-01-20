import React from 'react';
import './styles/header.less';

type Intro = {
  key: string,
  val: string
}

type HeaderProps = {
  intro: Intro[]
}

const Header:React.FC<HeaderProps> = props => {
  const { intro } = props;
  return (
    <header className="hing-header__wrapper">
      <img className="hing-img__avatar" src="/avatar.jpg" alt="我自己" />
      <div className="hing-div__intro">
        <dl className="hing-dl__group">
          {intro.map((item) => {
            return <dd className="hing-dd__item" key={item.key} dangerouslySetInnerHTML={{ __html: item.val }} />;
          })}
        </dl>
      </div>
    </header>
  );
};

export default Header;
