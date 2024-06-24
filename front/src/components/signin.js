import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value.trim(),
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value.trim(),
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value.trim(),
    });
  }

  validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  async onSubmit(e) {
    e.preventDefault();

    if (!this.validatePassword(this.state.password)) {
      this.setState({
        errorMessage:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character, and one number.",
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords do not match" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.state.password, salt);

    const user = {
      username: this.state.username,
      password: hashedPassword,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/signin/add", user)
      .then((res) => console.log(res.data))
      .catch((error) => console.error("Error adding user: ", error));

    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
          </div>

          {this.state.errorMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <div className="form-group">
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
        <Link to="/LogIn">Log in</Link>
      </div>
    );
  }
}
