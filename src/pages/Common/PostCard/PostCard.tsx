import styles from "./_postcard.module.scss";
import { NavLink } from "react-router-dom";
import UserCard from "../UserCard/UserCard";
import { Post } from "../../../interfaces/interfaces";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <NavLink className={styles.link} to={`/posts/${post.id}`}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.body}>{post.body}</p>
      </NavLink>
      <div className={styles.info}>
        <div className={styles.author}>
          <UserCard id={post?.userId} />
        </div>
        <div className={styles.tags}>
          {post.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
