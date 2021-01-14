import React, { memo, useEffect, useState } from 'react';
import Menus from '@/components/Menus';
import { MENU_HEISHT } from '@/components/Menus/menus.config';

import './style.less';

type LayoutProps = {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;
  const [wrapperHeight, setWrapperHeight] = useState(0);
  useEffect(() => {
    setWrapperHeight(window.innerHeight);
  }, []);
  return (
    <div className="content">
      <Menus />
      <div className="content-wrapper" style={{ height: `${wrapperHeight - MENU_HEISHT}px` }}>
      { children }
      </div>
    </div>
  );
};

export default memo(Layout);
