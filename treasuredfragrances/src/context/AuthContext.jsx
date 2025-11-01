// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ id: decoded.id, role: decoded.role });
          setIsLoggedIn(true);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${authToken}`;
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setIsLoggedIn(true);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    setIsLoggedIn(false);
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    loading,
  };

  // Don't render children until we've checked for a token
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};