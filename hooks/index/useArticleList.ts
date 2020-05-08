import { useState, useCallback, useEffect } from 'react';
import { ListItem} from 'typings/list';

const useArticleList = (list: ListItem[]) => {
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

  const handleSearchArticle = useCallback((title: string) => {
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
