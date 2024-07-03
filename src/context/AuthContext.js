// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    

    if (isLoggedIn) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    }

  }, []);

  const handleAuthentication = (isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin.toString());
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', isAdmin.toString());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, handleAuthentication, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
