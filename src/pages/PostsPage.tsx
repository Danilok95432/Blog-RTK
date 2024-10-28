import { useEffect, useRef, useCallback, useState } from "react";
import PostCard from "../components/PostCard";
import {
  useGetPostsByTagQuery,
  useGetPostsQuery,
  useGetPostsTagListQuery,
  useSearchPostQuery,
} from "../store/api";
import styles from "../styles/posts/_posts.module.scss";
import ReactLoading from "react-loading";
import { Post } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeValue } from "../store/search";
import ErrorCard from "../components/ErrorCard";

const PostsPage = () => {
  // ленивая загрузка

  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const { data: res, isLoading, isFetching } = useGetPostsQuery(page);

  const loadMorePosts = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) return;

    const options = {
      root: null,
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMorePosts();
        }
      });
    }, options);

    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }

    return () => {
      if (lastPostRef.current && observer.current) {
        observer.current.unobserve(lastPostRef.current);
      }
    };
  }, [isLoading, isFetching, loadMorePosts]);

  // --------------------

  // поиск

  const search = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(search);
  const [openSearch, setOpenSearch] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(changeValue(value));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(inputValue);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const { data: searchRes, isLoading: searchLoading } = useSearchPostQuery(
    debouncedSearchTerm,
    {
      skip: debouncedSearchTerm === "" || debouncedSearchTerm.length < 3,
    }
  );

  // --------------------

  // фильтрация по тегам

  const { data: tags } = useGetPostsTagListQuery();
  const [currentTag, setCurrentTag] = useState("");
  const { data: filterRes, isLoading: filterLoading } = useGetPostsByTagQuery(
    currentTag,
    {
      skip: currentTag === "",
    }
  );

  // --------------------
  if (isLoading)
    return (
      <div className="loading">
        <ReactLoading
          type={"spin"}
          color={"#000000"}
          height={667}
          width={375}
        />
      </div>
    );
  return (
    <div className={styles.posts_page}>
      <div
        className={`${styles.search_bar} ${openSearch ? styles._active : ""}`}
        onMouseEnter={() => setOpenSearch(true)}
        onMouseLeave={() => setOpenSearch(false)}
      >
        <input
          className={styles.search_bar__input}
          onChange={handleChange}
          onClick={() => setOpenSearch(true)}
          onMouseEnter={() => setOpenSearch(true)}
          type="text"
          placeholder="Введите ваш запрос.."
          name="search"
          value={search}
        />
        <select
          className={`${styles.search_bar__tags_filter} ${
            openSearch ? styles._active : ""
          }`}
          onChange={(e) => setCurrentTag(e.target.value)}
        >
          <option></option>
          {tags?.map((tag: string, index: number) => {
            return (
              <option key={index} className={styles.tag}>
                {tag}
              </option>
            );
          })}
        </select>
      </div>
      {isLoading || searchLoading || filterLoading ? (
        <ReactLoading
          type={"spin"}
          color={"#000000"}
          height={667}
          width={375}
        />
      ) : (
        <ul className={styles.posts_list}>
          {(() => {
            const postsToRender =
              debouncedSearchTerm !== "" || currentTag !== ""
                ? debouncedSearchTerm !== ""
                  ? searchRes?.posts
                  : filterRes?.posts
                : res?.posts;
            if (postsToRender?.length == 0) return <ErrorCard />;
            else
              return postsToRender?.map((post: Post, index: number) => {
                const isLastPost = index === postsToRender.length - 1;
                return (
                  <li ref={isLastPost ? lastPostRef : null} key={post.id}>
                    <PostCard post={post} />
                  </li>
                );
              });
          })()}
        </ul>
      )}
    </div>
  );
};

export default PostsPage;
