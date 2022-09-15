import React, { memo, ReactElement } from 'react';
import Link from 'next/link';
import { MENUS } from './menus.config';

import styles from './style.module.css';

type MenuLinkProps = {
  label: string,
  children?: ReactElement
}

const MenuLink: React.FC<MenuLinkProps> = memo(props => {
  const { label, children } = props;
  return (
    <span className={styles['menu-link__label']}>{label} {children}</span>
  );
});

const Menus: React.FC = () => {
  return (
    <div className={styles['menu-wrapper']}>
      {
        MENUS.map((item, index) => {
          const { link, key, label, blank } = item;
          return (
            <div className={styles['menu-link__wrapper']} key={key}>
              <Link href={link}>
                <a target={`${blank ? '_blank' : '_self'}`} className={styles['menu-link']}><MenuLink label={label} /></a>
              </Link>
              {
                index === MENUS.length - 1 ? '' : <i className={styles.italic}>/</i>
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Menus);
