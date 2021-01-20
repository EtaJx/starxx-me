import React, { memo, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Layout from '@/components/Layout';
import './style.less';
import Head from 'next/head';

type ArticleProps = {
  content: string,
  name: string,
  modifiedTime: string
}

// renders参数
type RendersParams = {
  language: string,
  value: string
}
// renders
type Renders = {
  code: (params: RendersParams) => React.ReactElement
}
const Article: React.FC<ArticleProps> = (props) => {
  const { name, content, modifiedTime } = props;
  const adjustName = name.replace('.md', '');
  const articleTime = moment(modifiedTime).utc().utcOffset(-8).locale('zh-CN').format('lll');
  const renders: Renders = useMemo(() => {
    return {
      code: ({ language, value }) => {
        return (
          <SyntaxHighlighter style={atomOneLight} language={language} children={value} />
        );
      }
    };
  }, []);
  return (
    <>
      <Head>
        <title>{adjustName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="article-wrapper">
          <h4 className="article-title">{adjustName}</h4>
          <span className="article-time">{articleTime}</span>
          <ReactMarkdown renderers={renders} children={content} />
        </div>
      </Layout>
    </>
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
