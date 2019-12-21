import React, { useCallback } from 'react'
import './style/search.less'

const Search = (props) => {
  const { handleSearchArticle } = props;
  const handleSearch = useCallback(e => {
    handleSearchArticle(e.target.value);
  }, []);
  return(
    <input className="hing-input__index__search" placeholder="这里可能是搜索框......" onChange={handleSearch}/>
  )
};

export default Search
