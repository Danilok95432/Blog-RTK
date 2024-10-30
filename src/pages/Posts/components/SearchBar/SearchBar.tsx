import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import styles from '../../_posts.module.scss'
import { isSearching } from "../../../../store/posts";
import TagsFilter from "./components/TagsFilter";


const SearchBar = () => {

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(isSearching(inputValue))
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);


  const searchBarClass = classNames(styles.searchBar, {
    [styles._active]: openSearch,
  });

  return(
    <div
      className={searchBarClass}
      onMouseEnter={() => setOpenSearch(true)}
      onMouseLeave={() => setOpenSearch(false)}
    >
      <input
        className={styles.input}
        onChange={handleChange}
        onClick={() => setOpenSearch(true)}
        onMouseEnter={() => setOpenSearch(true)}
        type="text"
        placeholder="Введите ваш запрос.."
        name="search"
      />
      <TagsFilter openSearch={openSearch}/>
    </div>
  )
}

export default SearchBar