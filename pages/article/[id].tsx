import React, { memo } from 'react';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Layout from '@/components/Layout';
import styles from './style.module.css';
import Head from 'next/head';

type ArticleProps = {
  content: string,
  name: string,
  modifiedTime: string
}

const codeComponent: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match
    ? (
      <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomOneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      )
    : (
      <code className={className} {...props}>
        {children}
      </code>
      );
};

const Article: React.FC<ArticleProps> = (props) => {
  const { name, content, modifiedTime } = props;
  const adjustName = name.replace('.md', '');
  const articleTime = moment(modifiedTime).utc().utcOffset(+8).locale('zh-CN').format('lll');
  return (
    <>
      <Head>
        <title>{adjustName}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.articleWrapper}>
          <h4 className={styles['article-title']}>{adjustName}</h4>
          <span className={styles['article-time']}>{articleTime}</span>
          <ReactMarkdown children={content} components={{
            code: codeComponent
          }}/>
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
