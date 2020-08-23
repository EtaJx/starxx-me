import React, { memo } from 'react';
import ComputedLink from '@/components/ComputedLink';
import { MENUS } from './menus.config';

import './style.less';

type MenuLinkProps = {
  label: string,
  isActive?: boolean
}

const MenuLink: React.FC<MenuLinkProps> = memo(props => {
  const { label, isActive } = props;
  return (
    <span className={`menu-link ${isActive ? 'menu-link-active' : ''}`}>{ label }</span>
  )
});

const Menus: React.FC = () => {
  return (
    <div className="menu-wrapper">
      {
        MENUS.map(item => {
          const { link, key, label } = item;
          return (
            <ComputedLink href={link} key={key} style={{ width: `${(1 / MENUS.length) * 100}%`}}>
              <MenuLink label={label} />
            </ComputedLink>
          );
        })
      }
    </div>
  )
}

export default memo(Menus);
