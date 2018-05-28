import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import VineyardList from "./VineyardList";
import OneVineyard from "./OneVineyard";
import {
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wines: ["hello", "hi"],
      search: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  handleInput(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: this.state.search
      }
    }).then(res => {
      this.setState({
        wines: res.data.result
      });
      //   console.log(this.state.wines);
    });
  }
  render() {
    return (
		<Router>
			<div>
				<Route exact path="/" component={Header}/>
				<Route exact path="/" component={VineyardList} />
				<Route 
				exact path="/:"
				render={(props) => <OneVineyard {...props} wines={this.state.wines} />}
				/>
				{/* <OneVineyard wines={this.state.wines} /> */}
			</div>
		</Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
