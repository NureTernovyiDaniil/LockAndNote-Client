import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../styles/PasswordDetail.module.css";

const PasswordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = usePasswordApi();
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password.password)
      .then(() => alert("Пароль скопійовано!"))
      .catch(() => alert("Помилка копіювання"));
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const data = await api.getPasswordById(id);
        setPassword(data);
      } catch (error) {
        console.error("Помилка при завантаженні пароля:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassword();
  }, [id]);

  if (loading) return <p className={styles.loading}>Завантаження...</p>;
  if (!password) return <p className={styles.error}>Пароль не знайдено</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Деталі пароля</h2>
      
      <button className={styles.backButton} onClick={handleBack}>
        ← Назад до списку паролів
      </button>

      <div className={styles.field}>
        <span className={styles.label}>Сервіс:</span>
        <span className={styles.value}>{password.serviceName}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Логін:</span>
        <span className={styles.value}>{password.login}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Пароль:</span>
        <span className={styles.value}>{password.password}</span>
        <button className={styles.copyButton} onClick={handleCopy}>Копіювати</button>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Нотатки:</span>
        <span className={styles.value}>{password.notes || "—"}</span>
      </div>
    </div>
  );
};

export default PasswordDetail;
