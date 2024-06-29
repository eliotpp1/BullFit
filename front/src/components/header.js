import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo_bullfit.webp";

const Header = () => {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setConnected(!!token);
  }, [connected]);

  const signOut = () => {
    localStorage.removeItem("token");
    setConnected(false);
    navigate("/signin");
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <img src={Logo} alt="Bullfit logo" className="logo" />
          </li>
          <li className="nav-item">
            <button onClick={() => navigate("/")} className="button-contained">
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => navigate("/test")}
              className="button-contained"
            >
              Items
            </button>
          </li>
          <li className="nav-item">
            {connected ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="button-contained"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("/calculator")}
                className="button-contained"
              >
                Calculator
              </button>
            )}
          </li>
          <li className="nav-item">
            {connected ? (
              <button onClick={signOut} className="button-outlined">
                Sign out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="button-outlined"
              >
                Log in
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
