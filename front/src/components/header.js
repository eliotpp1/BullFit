// Header.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo_bullfit.webp";
import { AuthContext } from "./context/authcontext";

const Header = () => {
  const navigate = useNavigate();
  const { connected, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signOut(); // Appel à la fonction signOut du contexte
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <img
              src={Logo}
              alt="Bullfit logo"
              className="logo"
              onClick={() => navigate("/")}
            />
          </li>
          <li className="nav-item">
            <button onClick={() => navigate("/")} className="button-contained">
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => navigate("/activities")}
              className="button-contained"
            >
              Activities
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => navigate("/workouts")}
              className="button-contained"
            >
              Workouts
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
              <button onClick={handleSignOut} className="button-outlined">
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
