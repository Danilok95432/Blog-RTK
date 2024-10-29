import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../store/api";
import styles from "./_postpage.module.scss";
import ReactLoading from "react-loading";
import Comments from "./components/Comments";
import UserCard from "../Common/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addReaction } from "../../store/reactions";
import { RootState } from "../../store/store";
import Views from "../../svg/Views";
import Like from "../../svg/Like";
import Dislike from "../../svg/Dislike";

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: post, isLoading } = useGetPostQuery(id);
  const reactions = useSelector(
    (state: RootState) => state.reactions.reactions
  );
  const currentPostReactions = reactions.filter(
    (reaction) => reaction.postId == Number(id)
  );

  const handleLike = () => {
    dispatch(addReaction({ postId: post.id, reactionType: "like" }));
  };

  const handleDislike = () => {
    dispatch(addReaction({ postId: post.id, reactionType: "dislike" }));
  };

  console.log(reactions)

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
    <div className={styles.postPage}>
      <div className={styles.content}>
        <h2 className={styles.title}>{post?.title}</h2>
        <p className={styles.body}>{post?.body}</p>

        <div className={styles.info}>
          <div className={styles.author}>
            <UserCard id={post?.userId} />
          </div>
          <div className={styles.views}>
            <Views />
            <span>{post?.views}</span>
          </div>
          <div className={styles.reactions}>
            <span>
              <span className={styles.likes}>
                <Like isLiked={currentPostReactions[0]?.like} handleReaction={handleLike}/>
                {post?.reactions.likes
                  ? currentPostReactions[0]?.like
                    ? post?.reactions.likes + 1
                    : post?.reactions.likes
                  : currentPostReactions[0]?.like
                  ? 1
                  : 0}
              </span>
              <span className={styles.dislikes}>
                <Dislike isDisliked={currentPostReactions[0]?.dislike} handleReaction={handleDislike}/>
                {post?.reactions.dislikes
                  ? currentPostReactions[0]?.dislike
                    ? post?.reactions.dislikes + 1
                    : post?.reactions.dislikes
                  : currentPostReactions[0]?.dislike
                  ? 1
                  : 0}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.tags}>
          {post?.tags.map((tag: string, index: number) => {
            return (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            );
          })}
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default PostPage;
