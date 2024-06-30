// dashboard component
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/authcontext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { username, connected } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate("/login");
    }
  }, [connected, navigate]);

  return (
    <div className="dashboard">
      <h3 className="dashboard__title">Dashboard</h3>
      <p className="dashboard__text">Welcome, {username}!</p>
    </div>
  );
};

export default Dashboard;
