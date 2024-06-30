import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

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
      localStorage.setItem("token", response.data);
      signIn();
      navigate("/test");
    } catch (error) {
      setErrorMessage("Error signing in: " + error.response.data);
    }
  };

  return (
    <div className="login">
      <h3 className="login__title">Log In</h3>
      <form className="login__form" onSubmit={onSubmit}>
        <div className="login__form-group">
          <label className="login__label">Username:</label>
          <input
            type="text"
            required
            className="login__input"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="login__form-group">
          <label className="login__label">Password:</label>
          <input
            type="password"
            required
            className="login__input"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="login__form-group">
          <input
            type="submit"
            value="Log in"
            className="login__btn login__btn--primary"
          />
        </div>
        <div className="login__form-group">
          <a className="login__link" href="/signin">
            Create an account
          </a>
        </div>
        <div className="login__form-group">
          <p className="login__error-message">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
