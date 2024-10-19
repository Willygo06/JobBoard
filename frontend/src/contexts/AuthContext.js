import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    const checkAuthStatus = () => {
      const uuid = localStorage.getItem('uuid'); // Vérifier dans le local storage
      if (uuid) {
        const { userId, role } = getUserRoleFromToken(uuid);
        setUserRole(role);
        setIsLoggedIn(true);
        setUserId(userId);
      }
    };
    checkAuthStatus();
  }, []);

  
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};


const getUserRoleFromToken = (uuid) => {
  const adminToken = "84c0002b-72f5-443a-9d9d-27cabdf3fd76";

  if (uuid === adminToken) {
    console.log("Rôle attribué : admin");
    return { userId: uuid, role: "admin" };
  }
  
  console.log("Rôle attribué : user");
  return { userId: uuid, role: "user" };
};
