import React, { useCallback, useEffect, useState } from 'react';
import { LIGHT_THEME } from './light.theme';
import { DARK_THEME } from '@/hooks/dark.theme';

const LIGHT = 'light';
const DARK = 'dark';

type ThemeObject = {
  [key: string]: React.CSSProperties
};

const useGlobalTheme = () => {
  const THEME: ThemeObject = {
    light: LIGHT_THEME,
    dark: DARK_THEME
  };
  const [themeType, setThemeType] = useState(LIGHT);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    setThemeType(localTheme ?? LIGHT);
  }, []);

  const toggleTheme = useCallback(() => {
    const currentThemeType = themeType === LIGHT ? DARK : LIGHT;
    setThemeType(currentThemeType);
    window.localStorage.setItem('theme', currentThemeType);
  }, [themeType]);

  return {
    [themeType]: THEME[themeType],
    currentThemeType: themeType,
    toggleTheme
  };
};

export default useGlobalTheme;
