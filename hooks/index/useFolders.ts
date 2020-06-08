import { useState, useCallback, useEffect } from 'react';
import { Folder } from 'typings/list';

const useFolders = (list: Folder[]) => {
  const [foldersList, setArticleList] = useState(list);
  const [searchParams, setSearchParams] = useState({
    title: ''
  });

  useEffect(() => {
    setArticleList(() => {
      const tempList = list.filter(file => file.folderName.indexOf(searchParams.title) > -1);
      return searchParams.title ? [...tempList] : [...list.map(item => ({ ...item, isOpen: true }))];
    })
  }, [searchParams.title]);

  const handleSearchArticle = useCallback((title: string) => {
    setSearchParams({
      title
    });
  }, []);

  return {
    foldersList,
    handleSearchArticle
  }

};

export default useFolders;
