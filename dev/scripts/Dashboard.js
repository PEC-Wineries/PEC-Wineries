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
          <img src={this.props.userImage} alt="" />
        </header>
      </React.Fragment>
    );
  }
}

export default Dashboard;
