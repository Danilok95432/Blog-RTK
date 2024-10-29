import { useCallback, useEffect, useRef, useState } from "react";
import PostCard from "../../../Common/PostCard/PostCard";
import styles from '../../_posts.module.scss'
import { useGetPostsQuery } from "../../../../store/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Post } from "../../../../interfaces/interfaces";

const PostsList = () => {

  const searchField = useSelector((state: RootState) => state.posts.searchField)
  const filterTag = useSelector((state: RootState) => state.posts.filterTag)

  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const { data: res, isLoading, isFetching } = useGetPostsQuery({page: page, search: searchField, tag: filterTag});

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
  
  return(
    <ul className={styles.posts_list}>
      {res?.posts.map((post: Post, index: number) => {
        const isLastPost = index === res?.posts.length - 1;
        return (
          <li ref={isLastPost ? lastPostRef : null} key={post.id}>
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  )
}

export default PostsList