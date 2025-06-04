import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="alert alert-info"><strong>Вітаємо</strong>!</div>
      <button className="btn btn-outline-danger" onClick={logout}>Вийти</button>
    </div>
  );
};

export default Home;