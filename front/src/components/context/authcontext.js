import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

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
            console.log("Token verified", response.data.username);
            setUsername(response.data.username);
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
  };

  return (
    <AuthContext.Provider value={{ connected, signIn, signOut, username }}>
      {children}
    </AuthContext.Provider>
  );
};
