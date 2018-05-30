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
      <header className="top-header">
        <div className="wrapper">
          <div className="title-text">
            <h1>Prince Edward County Vineyards</h1>
            <button>Learn More</button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
