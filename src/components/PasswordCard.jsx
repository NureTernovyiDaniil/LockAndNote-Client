import styles from "../styles/PasswordCard.module.css";
import { useNavigate } from "react-router";

const PasswordCard = ({ password }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/password/${password.entryId}`);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password.password)
      .then(() => alert("Пароль скопійовано!"))
      .catch(() => alert("Помилка копіювання"));
  };

  return (
   <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{password.serviceName}</h3>
    </div>
  );
};

export default PasswordCard;
