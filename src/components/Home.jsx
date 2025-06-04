import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import usePasswordApi from "../Hooks/usePasswordApi";
import AddPasswordForm from "./AddPasswordForm";
import styles from "../Styles/Home.module.css";
import PasswordsList from "./PasswordsList";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const api = usePasswordApi();

  const [passwords, setPasswords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!api) return;
    const fetchPasswords = async () => {
      try {
        const data = await api.getAllPasswords();
        setPasswords(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to load passwords", err);
      }
    };

    fetchPasswords();
  }, [api]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  const handlePasswordAdded = (newPassword) => {
    setPasswords((prev) => [...prev, newPassword]);
    setShowAddForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <strong>Паролі</strong>
      </div>

      <PasswordsList passwords={passwords}/>

      <button className={styles.addnewbutton} onClick={handleAddClick}>
        Додати пароль
      </button>

      <button className={styles.logoutButton} onClick={logout}>
        Вийти
      </button>

      {showAddForm && (
        <AddPasswordForm 
          api={api} 
          onClose={handleAddFormClose} 
          onAdd={handlePasswordAdded}
        />
      )}
    </div>
  );
};

export default Home;
