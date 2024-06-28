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
    <header>
      <nav>
        <ul>
          <li>
            <img src={Logo} alt="Bullfit logo" style={{ width: "30vw" }} />
          </li>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/test")}>Items</button>
          </li>
          <li>
            {connected ? (
              <>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/calculator")}>
                Calculator
              </button>
            )}
          </li>
          <li>
            {connected ? (
              <>
                <button onClick={signOut}>Sign out</button>
              </>
            ) : (
              <button onClick={() => navigate("/login")}>Log in</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
