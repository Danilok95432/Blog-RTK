import styles from "../styles/authorization/_authorizationpage.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../store/api";
import { useDispatch } from "react-redux";
import { changeLog, setToken } from "../store/authorization";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Это поле обязательно"),
  password: Yup.string()
    .required("Это поле обязательно")
    .min(8, "Пароль должен содержать минимум 6 символов"),
});

const AuthorizationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      }).unwrap();
      console.log(response)
      dispatch(changeLog(true));
      dispatch(setToken(response.accessToken));
      navigate("/posts");
    } catch (error) {
      alert("Ошибка при входе");
    }
  };

  return (
    <div className={styles.authorization_page}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authorization_form}
      >
        <h2>Авторизация</h2>
        <div className={styles.form_group}>
          <label htmlFor="username">Логин</label>
          <input
            type="username"
            id="username"
            {...register("username")}
            className={styles.form_input}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Пароль</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className={styles.form_input}
          />
          <button
            type="button"
            className={`${styles.password_btn} ${
              showPassword ? styles._close : styles._open
            }`}
            onClick={() => setShowPassword((prev: boolean) => !prev)}
          ></button>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles.submit_button}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthorizationPage;
