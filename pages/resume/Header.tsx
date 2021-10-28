import React from 'react';
import styles from './styles/header.module.css';

type Intro = {
  key: string,
  val: string
}

type HeaderProps = {
  intro: Intro[]
}

const Header:React.FC<HeaderProps> = props => {
  const { intro = [] } = props;
  return (
    <header className={styles['hing-header__wrapper']}>
      <img className={styles['hing-img__avatar']} src="/avatar.jpg" alt="我自己" />
      <div className={styles['hing-div__intro']}>
        <dl className={styles['hing-dl__group']}>
          {intro.map((item) => {
            return <dd className={styles['hing-dd__item']} key={item.key} dangerouslySetInnerHTML={{ __html: item.val }} />;
          })}
        </dl>
      </div>
    </header>
  );
};

export default Header;
