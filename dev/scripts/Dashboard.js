import React from "react";
import Login from "./Login";

class Dashboard extends React.Component {
  componentDidMount() {
    // console.log(this.props.loggedIn);
  }
  render() {
    return (
      <React.Fragment>
        <div className="user-login-bar clearfix">
          <img className="user-image" src={this.props.userImage} alt="" />
          <p>{`Welcome, ${this.props.userName}`}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
