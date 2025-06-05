import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import usePasswordApi from "../Hooks/usePasswordApi";
import styles from "../Styles/Home.module.css";
import PasswordsList from "./PasswordsList";
import { useNavigate } from "react-router";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const api = usePasswordApi();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!api) return;
    const fetchPasswords = async () => {
      try {
        if (searchQuery === "") {
          const data = await api.getAllPasswords();
          setPasswords(data);
        } else {
          console.log(searchQuery);
          const data = await api.searchPasswords(searchQuery);
          setPasswords(data);
        }
      } catch (err) {
        console.error("Failed to load passwords", err);
      }
    };

    fetchPasswords();
  }, [api, searchQuery]);

  const handleAddClick = () => {
    navigate("password/add");
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <strong>Паролі</strong>
      </div>
      <button className={styles.addnewbutton} onClick={handleAddClick}>
        Додати пароль
      </button>

      <button className={styles.logoutButton} onClick={logout}>
        Вийти
      </button>
      <input
        type="text"
        placeholder="Пошук..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PasswordsList passwords={passwords} />
    </div>
  );
};

export default Home;
