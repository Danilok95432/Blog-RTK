import { useDispatch, useSelector } from "react-redux";
import styles from "./_comments.module.scss";
import UserCard from "../../Common/UserCard/UserCard";
import { addReaction } from "../../../store/reactions";
import { RootState } from "../../../store/store";
import { Comment } from "../../../interfaces/interfaces";
import Like from "../../../svg/Like";
import Dislike from "../../../svg/Dislike";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const dispatch = useDispatch();

  const reactions = useSelector(
    (state: RootState) => state.reactions.reactions
  );
  const currentCommentReactions = reactions.filter(
    (reaction) => reaction.commentId == Number(comment.id)
  );

  const handleLike = () => {
    dispatch(addReaction({ commentId: comment.id, reactionType: "like" }));
  };

  const handleDislike = () => {
    dispatch(addReaction({ commentId: comment.id, reactionType: "dislike" }));
  };

  return (
    <li className={styles.comment}>
      <UserCard id={comment.user.id} />
      <div className={styles.content}>
        <p>{comment.body}</p>
      </div>

      <div className={styles.info}>
        <div className={styles.reactions}>
          <span>
            <span className={styles.likes}>
              <Like isLiked={currentCommentReactions[0]?.like} handleReaction={handleLike} />
              {comment?.likes
                ? currentCommentReactions[0]?.like
                  ? comment?.likes + 1
                  : comment?.likes
                : currentCommentReactions[0]?.like
                ? 1
                : 0}
            </span>
            <span className={styles.dislikes}>
              <Dislike isDisliked={currentCommentReactions[0]?.dislike} handleReaction={handleDislike} />
              {comment?.dislikes
                ? currentCommentReactions[0]?.dislike
                  ? comment?.dislikes + 1
                  : comment?.dislikes
                : currentCommentReactions[0]?.dislike
                ? 1
                : 0}
            </span>
          </span>
        </div>
      </div>
    </li>
  );
};

export default CommentCard;
