import React from "react";
import Login from "./Login";

class Dashboard extends React.Component {
  componentDidMount() {
    // console.log(this.props.loggedIn);
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <p>{`Hello ${this.props.userName}`}</p>
        </header>
      </React.Fragment>
    );
  }
}

export default Dashboard;
