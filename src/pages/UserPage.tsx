import { useParams } from "react-router-dom";
import { useGetPostsByUserQuery, useGetUserQuery } from "../store/api";
import styles from "../styles/users/_userpage.module.scss";
import { Post } from "../interfaces/interfaces";
import PostCard from "../components/PostCard";
import ReactLoading from "react-loading";

const UserPage = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery(id);
  const { data: res, isLoading: postsLoading } = useGetPostsByUserQuery(id);

  if (isLoading || postsLoading)
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
    <div className={styles.user_page}>
      <div className={styles.user_page__title_block}>
        <img src={user?.image} alt="" />
        <div className={styles.info}>
          <h2>{user?.firstName + " " + user?.lastName}</h2>
          <span>{user?.username}</span>
          <div className={styles.contacts}>
            <span>Email: {user?.email}</span>
            <span>Телефон: {user?.phone}</span>
          </div>
        </div>
      </div>
      <div className={styles.user_page__posts_block}>
        <h2>Посты пользователя {user?.username}:</h2>
        {res?.posts.length > 0 ? (
          res?.posts.map((post: Post) => {
            return <PostCard key={post.id} post={post} />;
          })
        ) : (
          <h3>У пользователя нет постов</h3>
        )}
      </div>
    </div>
  );
};

export default UserPage;
