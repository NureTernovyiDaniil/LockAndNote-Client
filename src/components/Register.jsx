import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/AuthStyles.module.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAccessHash, setPasswordAccessHash] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Паролі не співпадають");
      return;
    }

    const success = await register(email, password, passwordAccessHash);
    if (success) {
      navigate("/login");
    } else {
      setError("Помилка під час реєстрації");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Реєстрація</h3>

        {error && (
          <div
            style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        <label className={styles.label}>Пошта користувача</label>
        <input
          type="text"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть пошту"
          required
        />

        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть пароль"
          required
        />

        <label className={styles.label}>Підтвердження пароля</label>
        <input
          type="password"
          className={styles.input}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Повторіть пароль"
          required
        />
        <label className={styles.label}>Ключ доступу</label>
        <input
          type="text"
          className={styles.input}
          value={passwordAccessHash}
          onChange={(e) => setPasswordAccessHash(e.target.value)}
          placeholder="Введіть ключ доступу"
        />
        <button
          type="submit"
          className={styles.input}
          style={{
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default Register;
