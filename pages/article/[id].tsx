import React, { memo } from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/Layout';
import './style.less';

type ArticleProps = {
  content: string,
  name: string,
  modifiedTime: string
}
const Article: React.FC<ArticleProps> = (props) => {
  console.log('props', props);
  const { content } = props;
  return (
    <Layout>
      <div className="article-wrapper">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { id } } = context;
  const res = await fetch(`http://localhost:3000/api/article?id=${id}`);
  const result = await res.json();
  return {
    props: {
      ...result
    }
  };
};

export default memo(Article);
