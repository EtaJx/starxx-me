import React, { memo } from 'react';
import Layout from '@/components/Layout';

import './style.less';
import Head from 'next/head';

const Resume: React.FC<any> = props => {
  console.log('props', props);
  return (
    <>
      <Head>
        <title>resume</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="resume-wrapper"> i am resume</div>
      </Layout>
    </>
  );
};

export default memo(Resume);
