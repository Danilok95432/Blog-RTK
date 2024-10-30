import { useGetCommentsQuery } from "../../../store/api";
import styles from "./_comments.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Comment } from "../../../interfaces/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { CommentForm } from "../../../interfaces/interfaces";
import { addComment, setComments } from "../../../store/comments";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import classNames from "classnames";

const schema = Yup.object().shape({
  comment: Yup.string()
    .required("Это поле обязательно")
    .min(5, "Комментарий должен содержать минимум 5 символов"),
});

const Comments = () => {
  const { id } = useParams();
  const { data: res, isLoading } = useGetCommentsQuery(id);
  const user = useSelector((state: RootState) => state.user.user)
  const commentsRedux = useSelector(
    (state: RootState) => state.comments.comments
  );
  const commentsPost = commentsRedux.filter(
    (comment) => comment.postId == Number(id)
  );
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (res?.comments) {
      dispatch(setComments(res?.comments));
    }
  }, [dispatch, res]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    if(user){
      const commentObj = {
        body: data.comment,
        id: 1000,
        likes: 0,
        dislikes: 0,
        postId: Number(id),
        user: { id: Number(user?.id), username: String(user?.username), fullName: String(user?.firstName + ' ' + user?.lastName) },
      };
      dispatch(addComment(commentObj));
      reset();
    }
    else navigate('/authorization')
  };

  const commentBlockInput = classNames(styles.input, {
    [styles.errorInput]: errors.comment
  })

  if (isLoading)
    return (
      <ReactLoading type={"spin"} color={"#000000"} height={667} width={375} />
    );
  return (
    <div className={styles.commentsSection}>
      <h3>Комментарии:</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.newComment}
      >
        <div className={styles.commentBlock}>
          <input
            type="text"
            placeholder="Напишите комментарий..."
            {...register("comment", { required: "Это поле обязательно" })}
            className={commentBlockInput}
          />
          {errors.comment && <label className={styles.error}>{errors.comment.message}</label>}
        </div>
        <button type="submit" className={styles.commentButton}>
          Отправить
        </button>
      </form>
      <ul className={styles.list}>
        {commentsPost
          ? commentsPost
              .slice()
              .reverse()
              .map((comment: Comment) => {
                return <CommentCard key={comment.id} comment={comment} />;
              })
          : null}
      </ul>
    </div>
  );
};

export default Comments;
