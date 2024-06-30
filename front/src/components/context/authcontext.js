import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(!!localStorage.getItem("token"));

  const signIn = () => {
    setConnected(true);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setConnected(false);
  };

  return (
    <AuthContext.Provider value={{ connected, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
