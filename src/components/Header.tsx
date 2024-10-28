import { NavLink } from "react-router-dom";
import styles from "../styles/header/_header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeLog, setToken } from "../store/authorization";
import { useGetMeMutation } from "../store/api";
import { useEffect } from "react";
import { logout, setUser } from "../store/user";
import { clearReactions } from "../store/reactions";

const Header = () => {
  const isAuth = useSelector((state: RootState) => state.authorization.isAuth);
  const token = useSelector((state: RootState) => state.authorization.token);
  const user = useSelector((state: RootState) => state.user.user);

  const [authUser] = useGetMeMutation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(changeLog(false));
    dispatch(setToken(""));
    dispatch(clearReactions());
    dispatch(logout())
  };

  const getMe = async (token: string) => {
    try {
      const response = await authUser(token).unwrap();
      dispatch(setUser(response));
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getMe(token);
    }
  }, [isAuth]);

  return (
    <div className={styles.header}>
      <NavLink to="/posts" className={styles.header__logo}>
        Blog
      </NavLink>
      {isAuth ? (
        <div className={styles.header__authorizated}>
          <NavLink to={`/user/${user?.id}`}>
            <img className={styles.auth_user} src={user?.image} alt="" />
          </NavLink>
          <button onClick={handleLogOut} className={styles.logout}>
            Log out
          </button>
        </div>
      ) : (
        <NavLink to="/authorization" className={styles.header__login}>
          Log in
        </NavLink>
      )}
    </div>
  );
};

export default Header;
