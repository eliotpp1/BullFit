import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo_bullfit.webp";
import { AuthContext } from "./context/authcontext";
import {
  FaClipboardCheck,
  FaDumbbell,
  FaCalculator,
  FaUser,
} from "react-icons/fa";

const HeaderMobile = () => {
  const navigate = useNavigate();
  const { connected } = useContext(AuthContext);

  return (
    <header className="mobile-header">
      <nav className="mobile-nav">
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <img
              src={Logo}
              alt="Bullfit logo"
              className="mobile-logo"
              onClick={() => navigate("/")}
            />
          </li>
          <li className="mobile-nav-item">
            <button
              onClick={() => navigate("/activities")}
              className="mobile-button"
            >
              <FaClipboardCheck />
            </button>
          </li>
          <li className="mobile-nav-item">
            <button
              onClick={() => navigate("/workouts")}
              className="mobile-button"
            >
              <FaDumbbell />
            </button>
          </li>
          <li className="mobile-nav-item">
            <button
              onClick={() => navigate("/calculator")}
              className="mobile-button"
            >
              <FaCalculator />
            </button>
          </li>
          <li className="mobile-nav-item">
            {connected ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="mobile-button"
              >
                <FaUser />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mobile-button"
              >
                <FaUser />
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderMobile;
