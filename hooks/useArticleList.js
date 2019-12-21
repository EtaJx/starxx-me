import { useState, useCallback, useEffect } from 'react';

const useArticleList = list => {
  const [articleList, setArticleList] = useState(list);
  const [searchParams, setSearchParams] = useState({
    title: ''
  });

  useEffect(() => {
    setArticleList(() => {
      const tempList = list.filter(file => file.title.indexOf(searchParams.title) > -1);
      return searchParams.title ? [...tempList] : [...list];
    })
  }, [searchParams.title]);

  const handleSearchArticle = useCallback(title => {
    console.log('title', title);
    setSearchParams({
      title
    });
  }, []);

  return {
    articleList,
    handleSearchArticle
  }
};

export default useArticleList;
