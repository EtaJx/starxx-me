import React from 'react';
import Image from 'next/image';
import styles from '@/styles/resume/Header.module.css';
import avatar from '@/public/avatar.jpg';

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
      <Image src={avatar} className={styles['hing-img__avatar']} width="150px" height="150px" />
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
