import React, { useState } from "react";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../Styles/UpdatePassword.module.css";

const UpdatePassword = ({ token, id }) => {
  const api = usePasswordApi(token);
  const [form, setForm] = useState({
    serviceName: "",
    login: "",
    rawPassword: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.updatePassword(id, form);
      alert("Оновлено");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate} className={styles.form}>
      <input
        name="serviceName"
        placeholder="Сервіс"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="login"
        placeholder="Логін"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="rawPassword"
        placeholder="Пароль"
        onChange={handleChange}
        className={styles.input}
      />
      <textarea
        name="notes"
        placeholder="Нотатки"
        onChange={handleChange}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>
        Оновити
      </button>
    </form>
  );
};

export default UpdatePassword;