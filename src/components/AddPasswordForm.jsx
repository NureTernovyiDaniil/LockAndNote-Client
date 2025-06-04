import React, { useState } from "react";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../Styles/PasswordStyles.module.css";

const AddPasswordForm = ({ token }) => {
  const api = usePasswordApi(token);
  const [form, setForm] = useState({
    serviceName: "",
    login: "",
    rawPassword: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addPassword(form);
    alert("Пароль додано");
    setForm({ serviceName: "", login: "", rawPassword: "", notes: "" });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Додати пароль</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="serviceName"
            value={form.serviceName}
            onChange={handleChange}
            placeholder="Сервіс"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="login"
            value={form.login}
            onChange={handleChange}
            placeholder="Логін"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="rawPassword"
            value={form.rawPassword}
            onChange={handleChange}
            placeholder="Пароль"
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            className={styles.textarea}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Нотатки"
          />
        </div>
        <button className={styles.button} type="submit">Додати</button>
      </form>
    </div>
  );
};

export default AddPasswordForm;