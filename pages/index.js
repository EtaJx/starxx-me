import Layout from 'components/Layout';
import { getFetch } from '../lib/fetch';
import React from 'react';
import 'static/index.less';
import List from 'components/index/List';
import Search from 'components/index/Search';
import useFolders from 'hooks/index/useFolders';

const Index = (props) => {
  const { list } = props;
  const { foldersList, handleSearchArticle } = useFolders(list);
  return (
    <Layout title={'Hing'} count={{
      article: foldersList.length
    }}>
      <div className="hing-div__index__wrapper">
        <Search handleSearchArticle={handleSearchArticle} />
        <List list={foldersList} />
      </div>
    </Layout>
  )
};

Index.getInitialProps = async ({ req }) => {
  const fetch = getFetch(req);
  const requestUrl = req ? `http://${req.headers['host']}`: 'http://localhost:8080';
  const res = await fetch(`${requestUrl}/list`);
  const json = await res.json();
  return {
    list: json.list.map(item => ({
      ...item,
      isOpen: true
    }))
  }
};

export default Index
