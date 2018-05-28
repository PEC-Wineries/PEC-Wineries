import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Login from "./Login";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Prince</h1>
        <h1>Edward</h1>
        <h1>County</h1>
        <h1>Wineries</h1>
      </header>
    );
  }
}

export default Header;
