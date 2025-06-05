import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../Styles/PasswordDetail.module.css";

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

  const handleUpdate = () => {
    navigate(`/password/update/${id}`);
  };

  const handleDelete = () => {
    if (confirm("Ви підтверджуєте видалення?")) {
      api.deletePassword(id);
      navigate("/");
    }
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
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.backButton}`}
          onClick={handleBack}
        >
          ← Назад
        </button>
        <button
          className={`${styles.button} ${styles.updateButton}`}
          onClick={handleUpdate}
        >
          Оновити
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDelete}
        >
          Видалити
        </button>
        <button
          className={`${styles.button} ${styles.copyButton}`}
          onClick={handleCopy}
        >
          Скопіювати пароль
        </button>
      </div>
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
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Нотатки:</span>
        <span className={styles.value}>{password.notes || "—"}</span>
      </div>
    </div>
  );
};

export default PasswordDetail;
