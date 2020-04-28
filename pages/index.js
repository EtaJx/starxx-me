import Layout from 'components/Layout'
import fetch from 'node-fetch'
import React from 'react'
import 'static/index.less'
import List from 'components/index/List'
// import Search from 'components/index/Search'
import useArticleList from 'hooks/useArticleList';

const Index = (props) => {
  const { list } = props;
  const { articleList, handleSearchArticle } = useArticleList(list);
  return (
    <Layout title={'Hing'} count={{
      article: articleList.length
    }}>
      <div className="hing-div__index__wrapper">
        {/*<Search handleSearchArticle={handleSearchArticle} />*/}
        <List list={articleList} />
      </div>
    </Layout>
  )
};

Index.getInitialProps = async ({ req }) => {
  const baseUrl = `http://${req.headers['host']}`;
  const res = await fetch(`${baseUrl}/list`);
  const json = await res.json();
  return {
    list: json.list
  }
};

export default Index
