import React, { memo } from 'react';
import ResumeHeader from './Header';
import ResumeContent from './Content';
import ResumeSelfEvaluation from './SelfEvaluation';
import Layout from '@/components/Layout';

import './style.less';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

const Resume: React.FC<any> = props => {
  const { data = {} } = props;
  const { intro, resume, evaluation } = data;
  return (
    <>
      <Head>
        <title>经历</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="resume-wrapper">
          <ResumeHeader intro={intro} />
          <ResumeContent resume={resume} />
          <ResumeSelfEvaluation evaluation={evaluation} />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/resume');
  const result = await res.json();
  return {
    props: {
      ...result
    }
  };
};

export default memo(Resume);
