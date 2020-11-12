import React, { memo, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import './style.less';

const Home: React.FC = () => {
  const [wrapperHeight, setWrapperHeight] = useState(0);
  useEffect(() => {
    setWrapperHeight(window.innerHeight);
  }, []);
  return (
    <>
      <Head>
        <title>Personal Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="index-wrapper" style={{ height: `${wrapperHeight - 50}px` }}>
          {/* <div className="bubble" /> */}
          Yes, I am Index.
        </div>
      </Layout>
    </>
  );
};

export default memo(Home);
