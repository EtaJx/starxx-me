import Layout from '../components/Layout';
import { getFetch } from '../lib/fetch';
import React from 'react';
import moment from 'moment';
import 'static/content.less';

const Content = (props) => {
  const { article, articleCounts } = props
  const { title, date, html } = article
  return (
    <Layout title={title} count={{
      article: articleCounts
    }}>
      <header className="content-header">
        <h4>{title}</h4>
      </header>
      <div className='content'>
        <span className="content-time">{moment(date).format('YYYY-MM-DD hh:mm:ss')}</span>
        <div dangerouslySetInnerHTML={{
          __html: html
        }} />
      </div>
    </Layout>
  )
}

Content.getInitialProps = async ({ req, query }) => {
  const fetch = getFetch(req);
  const requestUrl = req ? `http://${req.headers['host']}`: 'http://localhost:8080';
  const {token} = query;
  const res = await fetch(`${requestUrl}/api?token=${token}`);
  const {article, articleCounts} = await res.json();
  return {
    article, articleCounts
  };
}

export default Content;
