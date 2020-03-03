import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  // Data
  state = {
    email: "",
    password: "",
    error: ""
  };
  // Methods
  login = e => {
    e.preventDefault();
    if (this.state.email == "" || this.state.password == "") {
      this.setState({
        error: "All Fields are required! "
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/users/login`, {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          console.log({ res });
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/");
          } else {
            this.setState({
              error: "wrong credentials"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  setMailLogin = e => {
    this.setState({
      email: e.target.value
    });
  };

  setPasswordLogin = e => {
    this.setState({
      password: e.target.value
    });
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.login}>
        <input onChange={this.setMailLogin} type="text" placeholder="Email" />
        <input
          onChange={this.setPasswordLogin}
          type="password"
          placeholder="Password"
        />
        <button type="submit" className="positive">
          Login
        </button>
        <div className="link">
          <a href="/signup">New here? Create an account</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default withRouter(Login);
