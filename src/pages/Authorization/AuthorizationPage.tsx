import styles from './_authorizationpage.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../store/api";
import { useDispatch } from "react-redux";
import { changeLog, setToken } from "../../store/authorization";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface FormValues {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Это поле обязательно"),
  password: Yup.string()
    .required("Это поле обязательно")
    .min(8, "Пароль должен содержать минимум 8 символов"),
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
      dispatch(changeLog(true));
      dispatch(setToken(response.accessToken));
      navigate("/posts");
    } catch (error) {
      alert(`Ошибка при входе: ${error}`);
    }
  };

  const passwordBtnClass = classNames(styles.password_btn, {
    [styles._close]: showPassword,
    [styles._open]: !showPassword,
  });

  return (
    <div className={styles.authorizationPage}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authorizationForm}
      >
        <h2>Авторизация</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username">Логин</label>
          <input
            type="username"
            id="username"
            {...register("username")}
            className={styles.formInput}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className={styles.formInput}
          />
          <button
            type="button"
            className={passwordBtnClass}
            onClick={() => setShowPassword((prev: boolean) => !prev)}
          ></button>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthorizationPage;
