import styles from "../Styles/PasswordCard.module.css";
import { useNavigate } from "react-router";

const PasswordCard = ({ password }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/password/${password.entryId}`);
  };

  return (
   <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{password.serviceName}</h3>
    </div>
  );
};

export default PasswordCard;
