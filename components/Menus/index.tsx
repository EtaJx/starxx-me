import React, { memo, ReactElement } from 'react';
import ComputedLink from '@/components/ComputedLink';
import { MENUS } from './menus.config';

import styles from './style.module.css';

type MenuLinkProps = {
  label: string,
  isActive?: boolean,
  children?: ReactElement
}

const MenuLink: React.FC<MenuLinkProps> = memo(props => {
  const { label, isActive, children } = props;
  return (
    <span className={`${styles['menu-link']} ${isActive ? `${styles['menu-link-active']}` : ''}`}>{label} {children}</span>
  );
});

const Menus: React.FC = () => {
  return (
    <div className={styles['menu-wrapper']}>
      {
        MENUS.map((item, index) => {
          const { link, key, label } = item;
          return (
            <div className={styles['menu-link__wrapper']} key={key}>
              <ComputedLink href={link}>
                <MenuLink label={label} />
              </ComputedLink>
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
