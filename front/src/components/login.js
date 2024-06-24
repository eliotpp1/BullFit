import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("token", response.data); // Sauvegarder le jeton dans le stockage local
      navigate("/test"); // Rediriger vers la page de test après connexion réussie
    } catch (error) {
      setErrorMessage("Error signing in: " + error.response.data);
    }
  };

  return (
    <div>
      <h3>Log In</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </div>
        <div className="form-group">
          <Link to="/signup">Create an account</Link>
        </div>
        <div className="form-group">
          <p>{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
