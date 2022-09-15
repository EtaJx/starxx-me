import React, { memo } from 'react';
import Menus from '@/components/Menus';

import useGlobalTheme from '@/hooks/useGlobalTheme';

import styles from './style.module.css';

type LayoutProps = {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;
  const currentTheme = useGlobalTheme();
  const { currentThemeType = 'light', toggleTheme } = currentTheme;
  return (
    <div
      className={styles.content}
      style={currentTheme[currentThemeType] as React.CSSProperties}
    >
      <Menus />
      <div className={styles['content-wrapper']}>
        { children }
      </div>
      <span
        onClick={toggleTheme}
        className={`${styles['theme-toggle']} ${styles[currentThemeType]}`}
      />
    </div>
  );
};

export default memo(Layout);
