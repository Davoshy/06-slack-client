import React from "react";
import axios from "axios";
class Signup extends React.Component {
  // Data
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  };
  setName = e => {
    this.setState({
      name: e.target.value
    });
  };
  setMail = e => {
    this.setState({
      email: e.target.value
    });
  };
  setPassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  // Methods
  signup = e => {
    e.preventDefault();
    if (
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.password == ""
    ) {
      this.setState({
        error: "All Fields are required! "
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/users/signup`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            this.props.history.push("/");
          } else {
            this.setState({
              error: response.data
            });
          }
        })
        .catch(err => console.log(err));
    }
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={e => this.signup(e)}>
        <input onChange={this.setName} type="text" placeholder="Full Name" />
        <input onChange={this.setMail} type="text" placeholder="Email" />
        <input
          onChange={this.setPassword}
          type="password"
          placeholder="Password"
        />
        <button type="submit" className="positive">
          Signup
        </button>
        <div className="link">
          <a href="/login">Already have an account? Login</a>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default Signup;
