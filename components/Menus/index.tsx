import React, { memo } from 'react';
import ComputedLink from '@/components/ComputedLink';
import { MENUS } from './menus.config';

import './style.less';

type MenuLinkProps = {
  label: string,
  isActive?: boolean
}

const MenuLink: React.FC<MenuLinkProps> = memo(props => {
  const { label, isActive, children } = props;
  return (
    <span className={`menu-link ${isActive ? 'menu-link-active' : ''}`}>{label} {children}</span>
  );
});

const Menus: React.FC = () => {
  return (
    <div className="menu-wrapper">
      {
        MENUS.map((item, index) => {
          const { link, key, label } = item;
          return (
            <div className="menu-link__wrapper" key={key}>
              <ComputedLink href={link}>
                <MenuLink label={label} />
              </ComputedLink>
              {
                index === MENUS.length - 1 ? '' : <i className="italic">/</i>
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Menus);
