import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../Styles/UpdatePassword.module.css";

const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = usePasswordApi();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    entryId: "",
    serviceName: "",
    login: "",
    rawPassword: "",
    notes: "",
  });

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const data = await api.getPasswordById(id);
        setForm({
          entryId: data.entryId,
          serviceName: data.serviceName,
          login: data.login,
          rawPassword: data.password,
          notes: data.notes
        });
      } catch (error) {
        console.error("Помилка при завантаженні пароля:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassword();
  }, [id]);

  if (loading) return <p className={styles.loading}>Завантаження...</p>;
  if (!form) return <p className={styles.error}>Пароль не знайдено</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.updatePassword(id, form);
      alert("Оновлено");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate} className={styles.form}>
      <div className={styles.label}>Сервіс</div>
      <input
        name="serviceName"
        placeholder="Сервіс"
        onChange={handleChange}
        className={styles.input}
        value={form.serviceName}
      />
      <div className={styles.label}>Логін</div>
      <input
        name="login"
        placeholder="Логін"
        onChange={handleChange}
        className={styles.input}
        value={form.login}
      />
      <div className={styles.label}>Пароль</div>
      <input
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
        className={styles.input}
        value={form.rawPassword}
      />
      <div className={styles.label}>Нотатки</div>
      <textarea
        name="notes"
        placeholder="Нотатки"
        onChange={handleChange}
        className={styles.textarea}
        value={form.notes}
      />
      <button type="submit" className={styles.button}>
        Оновити
      </button>
    </form>
  );
};

export default UpdatePassword;