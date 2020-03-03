import React, { Component } from "react";
import Chat from "./Chat";
import "./styles/App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

class App extends Component {
  // Methods
  // Render
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {localStorage.getItem("token") ? (
            <Route path="/" component={Chat} />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
