import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getLocalStorageItem = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value !== null ? parseFloat(value) : defaultValue;
  };

  const mas = getLocalStorageItem("mas", 0);
  const bmi = getLocalStorageItem("bmi", 0);
  const fc60 = getLocalStorageItem("fc60", 0);
  const fc65 = getLocalStorageItem("fc65", 0);
  const fc75 = getLocalStorageItem("fc75", 0);
  const fc85 = getLocalStorageItem("fc85", 0);
  const fc95 = getLocalStorageItem("fc95", 0);
  const fc100 = getLocalStorageItem("fc100", 0);

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
        stats: {
          bmi,
          mas,
          fc60,
          fc65,
          fc75,
          fc85,
          fc95,
          fc100,
        },
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error adding user: ", error);
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred");
      }
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  return (
    <div className="sign-in">
      <h3 className="sign-in__title">Sign In</h3>
      <form className="sign-in__form" onSubmit={onSubmit}>
        <div className="sign-in__form-group">
          <label className="sign-in__label">Username: </label>
          <input
            type="text"
            required
            className="sign-in__input"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="sign-in__form-group">
          <label className="sign-in__label">Password: </label>
          <input
            type="password"
            required
            className="sign-in__input"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="sign-in__form-group">
          <label className="sign-in__label">Confirm Password: </label>
          <input
            type="password"
            required
            className="sign-in__input"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="sign-in__form-group">
          <input
            type="submit"
            value="Sign In"
            className="btn btn-primary button-outlined"
          />
        </div>
      </form>
      <button className="sign-in__login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default SignIn;
