import React, { memo } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const Starxme: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default memo(Starxme);
