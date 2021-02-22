import React, { memo } from 'react';
import Menus from '@/components/Menus';

import useGlobalTheme from '@/hooks/useGlobalTheme';

import './style.less';

type LayoutProps = {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;
  const currentTheme = useGlobalTheme();
  const { currentThemeType = 'light', toggleTheme } = currentTheme;
  return (
    <div
      className="content"
      style={currentTheme[currentThemeType] as React.CSSProperties}
    >
      <Menus />
      <div className="content-wrapper">
        { children }
      </div>
      <span
        onClick={toggleTheme}
        className={`theme-toggle ${currentThemeType}`}
      />
    </div>
  );
};

export default memo(Layout);
