import React, { memo } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.less';

const Starxme: React.FC<AppProps> =  ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default memo(Starxme);
