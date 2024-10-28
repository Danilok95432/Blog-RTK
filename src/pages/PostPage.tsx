import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../store/api";
import styles from "../styles/posts/_postpage.module.scss";
import ReactLoading from "react-loading";
import Comments from "../components/Comments";
import UserCard from "../components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addReaction } from "../store/reactions";
import { RootState } from "../store/store";

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
    <div className={styles.post_page}>
      {isLoading ? (
        <ReactLoading
          type={"spin"}
          color={"#000000"}
          height={667}
          width={375}
        />
      ) : (
        <>
          <div className={styles.post_page__content}>
            <h2 className={styles.post_page__title}>{post?.title}</h2>
            <p className={styles.post_page__body}>{post?.body}</p>

            <div className={styles.post_page__info}>
              <div className={styles.author}>
                <UserCard id={post?.userId} />
              </div>
              <div className={styles.views}>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                      fill="#000000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
                <span>{post?.views}</span>
              </div>
              <div className={styles.reactions}>
                <span>
                  <span className={styles.likes}>
                    <svg
                      width="25px"
                      height="25px"
                      fill={
                        currentPostReactions[0]?.like ? "#ff0000" : "#000000"
                      }
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke={
                        currentPostReactions[0]?.like ? "#ff0000" : "#000000"
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
                    {post?.reactions.likes
                      ? currentPostReactions[0]?.like
                        ? post?.reactions.likes + 1
                        : post?.reactions.likes
                      : currentPostReactions[0]?.like
                      ? 1
                      : 0}
                  </span>
                  <span className={styles.dislikes}>
                    <svg
                      width="25px"
                      height="25px"
                      fill={
                        currentPostReactions[0]?.dislike ? "#ff0000" : "#000000"
                      }
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke={
                        currentPostReactions[0]?.dislike ? "#ff0000" : "#000000"
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

            <div className={styles.post_page__tags}>
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
        </>
      )}
    </div>
  );
};

export default PostPage;
