import { useDispatch, useSelector } from "react-redux";
import { CommentCardProps } from "../interfaces/interfaces";
import styles from "../styles/comments/_comments.module.scss";
import UserCard from "./UserCard";
import { useState } from "react";
import { addReaction } from "../store/reactions";
import { RootState } from "../store/store";

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const reactions = useSelector(
    (state: RootState) => state.reactions.reactions
  );
  const currentCommentReactions = reactions.filter(
    (reaction) => reaction.commentId == Number(comment.id)
  );

  const handleLike = () => {
    if (dislike) {
      setDislike(false);
    }
    setLike(!like);
    dispatch(addReaction({ commentId: comment.id, reactionType: "like" }));
  };

  const handleDislike = () => {
    if (like) {
      setLike(false);
    }
    setDislike(!dislike);
    dispatch(addReaction({ commentId: comment.id, reactionType: "dislike" }));
  };

  return (
    <li className={styles.comment}>
      <UserCard id={comment.user.id} />
      <div className={styles.comment__content}>
        <p>{comment.body}</p>
      </div>

      <div className={styles.comment__info}>
        <div className={styles.reactions}>
          <span>
            <span className={styles.likes}>
              <svg
                width="25px"
                height="25px"
                fill={currentCommentReactions[0]?.like ? "#ff0000" : "#000000"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke={
                  currentCommentReactions[0]?.like ? "#ff0000" : "#000000"
                }
                onClick={handleLike}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M3,21a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V21ZM19.949,10H14.178V5c0-2-3.076-2-3.076-2s0,4-1.026,5C9.52,8.543,8.669,10.348,8,11V21H18.644a2.036,2.036,0,0,0,2.017-1.642l1.3-7A2.015,2.015,0,0,0,19.949,10Z"></path>
                </g>
              </svg>
              {comment?.likes
                ? currentCommentReactions[0]?.like
                  ? comment?.likes + 1
                  : comment?.likes
                : currentCommentReactions[0]?.like
                ? 1
                : 0}
            </span>
            <span className={styles.dislikes}>
              <svg
                width="25px"
                height="25px"
                fill={
                  currentCommentReactions[0]?.dislike ? "#ff0000" : "#000000"
                }
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke={
                  currentCommentReactions[0]?.dislike ? "#ff0000" : "#000000"
                }
                onClick={handleDislike}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M3,21a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V21ZM19.949,10H14.178V5c0-2-3.076-2-3.076-2s0,4-1.026,5C9.52,8.543,8.669,10.348,8,11V21H18.644a2.036,2.036,0,0,0,2.017-1.642l1.3-7A2.015,2.015,0,0,0,19.949,10Z"></path>
                </g>
              </svg>
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
