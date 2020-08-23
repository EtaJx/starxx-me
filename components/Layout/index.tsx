import React, { memo } from 'react';
import Menus from '@/components/Menus';

type LayoutProps = {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;
  return (
    <div>
      <Menus />
      { children }
    </div>
  )
};

export default memo(Layout);

