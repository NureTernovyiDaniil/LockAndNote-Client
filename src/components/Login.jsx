import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/AuthStyles.module.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Вхід</h3>

        {error && (
          <div className={styles.error}>{error}</div>
        )}

        <label className={styles.label}>Ім’я користувача</label>
        <input
          type="text"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть логін"
        />

        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть пароль"
        />

        <button className={styles.button} type="submit">
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;