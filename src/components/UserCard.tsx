import { Link } from "react-router-dom";
import { useGetUserQuery } from "../store/api";
import styles from "../styles/users/_usercard.module.scss";

const UserCard = (id: any) => {
  const { data: user } = useGetUserQuery(id.id);

  return (
    <Link className={styles.user_card} to={`/user/${user?.id}`}>
      <img className={styles.user_card__avatar} src={user?.image} alt="" />
      <span className={styles.user_card__username}>{user?.username}</span>
      <span className={styles.user_card__fullName}>
        {user?.firstName + " " + user?.lastName}
      </span>
    </Link>
  );
};

export default UserCard;
