import styles from "./_posts.module.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import PostsList from "./components/PostsList/PostsList";

const PostsPage = () => {
  return (
    <div className={styles.posts_page}>
      <SearchBar />
      <PostsList />
    </div>
  );
};

export default PostsPage;
