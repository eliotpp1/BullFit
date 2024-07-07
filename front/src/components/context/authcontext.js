import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/login/verify-token",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.valid) {
            console.log("Token verified", response.data.user.name);
            setUser(response.data.user);
            setConnected(true);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token verification failed", error);
          localStorage.removeItem("token");
        }
      }
    };

    checkToken();
  }, []);

  const signIn = () => {
    setConnected(true);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setConnected(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ connected, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
