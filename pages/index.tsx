import React, { memo } from 'react';
import Head from 'next/head';
import './style.less';

export default memo(function Home() {
  return (
    <>
      <Head>
        <title>Personal Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="index-wrapper">
        i am index
      </div>
    </>
  );
});
