import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../../store/api";
import styles from "./_usercard.module.scss";

const UserCard = (id: any) => {
  const { data: user } = useGetUserQuery(id.id);

  return (
    <Link className={styles.userCard} to={`/user/${user?.id}`}>
      <img className={styles.avatar} src={user?.image} alt="" />
      <span className={styles.username}>{user?.username}</span>
      <span className={styles.fullName}>
        {user?.firstName + " " + user?.lastName}
      </span>
    </Link>
  );
};

export default UserCard;
