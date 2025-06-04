import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const storedAccess = localStorage.getItem("lockAndNoteAccessToken");
    console.log("Loaded token from localStorage:", storedAccess);
    if (storedAccess && isTokenValid(storedAccess)) {
      setAccessToken(storedAccess);
      setTokenValid(true);
    } else {
      setAccessToken("");
      setTokenValid(false);
    }
  }, []);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);

      if (!decoded.exp) {
        console.warn("No exp claim in token");
        return false;
      }

      const now = Date.now();
      const exp = decoded.exp * 1000;

      return now < exp;
    } catch (err) {
      console.error("Token decoding failed:", err);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await AuthService.login(email, password);
      setAccessToken(data.accessToken);
      setTokenValid(isTokenValid(data.token));
      localStorage.setItem("lockAndNoteAccessToken", data.token);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const register = async (email, password, passwordAccessHash) => {
    try {
      const data = await AuthService.register(
        email,
        password,
        passwordAccessHash
      );

      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("lockAndNoteAccessToken");
    setAccessToken("");
    setTokenValid(false);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, tokenValid, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
