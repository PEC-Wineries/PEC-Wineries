//This component performs the function of logging the user into the application. If the user is logged in, then they will be able to save wines to their account to view for later

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Dashboard from "./Dashboard";

class Login extends React.Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.loggedIn === false && (
          <button className="loginButton" onClick={this.props.loginWithGoogle}>
            Login With Google
          </button>
        )}
        {/* The dashboard allows users to see wines they have saved on their profile. If they aren't logged in, they won't be able to see this section */}
        {this.props.loggedIn === true ? (
          <Dashboard
            user={this.props.user}
            loggedIn={this.props.loggedIn}
            userName={this.props.userName}
            userImage={this.props.userImage}
          />
        ) : <div className="test"></div>}
        {/* Turnary operator to display button if logged in */}
        {this.props.loggedIn === true ? (
          <button className="logoutButton" onClick={this.props.logout}>
            Logout
          </button>
        ) : null}
      </div>
    );
  }
}

export default Login;
