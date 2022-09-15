import React, { memo } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { folderStructs } from '@/typings/list';
import List from './List';
import styles from './style.module.css';

type ListProps = {
  result: folderStructs
}
const Home: React.FC<ListProps> = (props) => {
  const { result } = props;
  return (
    <>
      <Head>
        <title>Hing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles['index-wrapper']}>
          <List folderList={result} />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/list');
  const data = await res.json();
  return {
    props: {
      ...data
    }
  };
};

export default memo(Home);
