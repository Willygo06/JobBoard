// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");

  useEffect(() => {
    // Vérifiez le token dans les cookies au chargement
    const checkAuthStatus = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (token) {
        setIsLoggedIn(true);
        // Vous pouvez également décoder le token pour obtenir le rôle de l'utilisateur
        setUserRole("user"); // ou 'admin' selon le cas
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
