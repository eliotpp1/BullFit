import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Utilisez useNavigate pour la navigation

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation
  const speed = localStorage.getItem("speed");
  const pace = localStorage.getItem("pace");
  const calories = localStorage.getItem("calories");
  const mas = localStorage.getItem("mas");
  const fc65 = localStorage.getItem("fc65");
  const fc75 = localStorage.getItem("fc75");
  const fc85 = localStorage.getItem("fc85");
  const fc95 = localStorage.getItem("fc95");
  const fc100 = localStorage.getItem("fc100");

  const onChangeUsername = (e) => {
    setUsername(e.target.value.trim());
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value.trim());
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signin", {
        username,
        password,
        speed,
        pace,
        calories,
        mas,
        fc65,
        fc75,
        fc85,
        fc95,
        fc100,
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error adding user: ", error);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  return (
    <div>
      <h3>Sign In</h3>
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
          <label>Confirm Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="form-group">
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </div>
      </form>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default SignIn;
