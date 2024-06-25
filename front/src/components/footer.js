// footer component
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <button onClick={() => navigate("/legal")}>
        © 2024 | BullFit | Legal informations
      </button>
    </footer>
  );
};

export default Footer;
