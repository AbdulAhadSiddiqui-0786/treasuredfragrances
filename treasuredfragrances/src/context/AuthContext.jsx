import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance"; // Import your axios instance

// 1. Initialize token state from localStorage
const getInitialToken = () => localStorage.getItem("token") || null;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 2. Store the token in state, not just a boolean
  const [token, setToken] = useState(getInitialToken());

  // 3. Derive isLoggedIn from the token state
  const isLoggedIn = !!token;

  // 4. Set the token on the axios instance whenever it changes
  // This ensures all API calls are authenticated after login.
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 5. Provide both `isLoggedIn` and the `token` itself
  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);