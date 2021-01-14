import React, { memo } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import './style.less';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Personal Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="index-wrapper">
          {/* <div className="bubble" /> */}
        </div>
      </Layout>
    </>
  );
};

export default memo(Home);
