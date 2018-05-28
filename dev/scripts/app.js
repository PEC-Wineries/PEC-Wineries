import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import Login from "./Login";
import OneVineyard from "./OneVineyard";
import SavedWines from "./SavedWines";
import Rebase from "re-base";
import firebase from "firebase";
import Dashboard from "./Dashboard";
import VineyardList from "./VineyardList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Firebase Configuration
const config = {
  apiKey: "AIzaSyAPsXd30dVq3pAnNShy6TIju6b6avnpO-I",
  authDomain: "pec-wineries.firebaseapp.com",
  databaseURL: "https://pec-wineries.firebaseio.com",
  projectId: "pec-wineries",
  storageBucket: "pec-wineries.appspot.com",
  messagingSenderId: "397288024866"
};
const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wines: [],
      search: "", //Saved allows users to save the wine they choose in vineyard section
      saved: [],
      loggedIn: false,
      user: {},
      userName: "",
      uid: "default",
      userImage: "none"
      //The states listed below are for the form section that will be sent to each vineyard for wine tours
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveThisWine = this.saveThisWine.bind(this);
    this.removeThisWine = this.removeThisWine.bind(this);
    this.logout = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState(
          {
            loggedIn: true,
            user: user,
            userName: user.displayName,
            uid: user.uid,
            userImage: user.photoURL
          },
          () => {
            this.dbRef = firebase.database().ref(this.state.uid);
          }
        );
        this.dbRef.on("value", snapshot => {
          const data = snapshot.val();
          const savedArray = [];
          for (let item in data) {
            savedArray.push(data[item]);
          }
          this.setState({
            saved: savedArray
          });
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {})
      //Error catcher
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    firebase.auth().signOut();
    console.log("Signed Out");
    this.dbRef.off();
    this.setState({
      saved: []
    });
  }

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
      console.log(res);
      this.setState({
        wines: res.data.result
      });
    });
  }

  saveThisWine(wine) {
    //Take a copy of state
    const savedState = this.state.saved;
    const dbRef = firebase.database().ref(this.state.uid);
    //add to saved object and prevent duplicates
    let repeat = false;
    for (let i = 0; i < savedState.length; i++) {
      if (wine === savedState[i]) {
        repeat = true;
      }
    }
    if (repeat === false) {
      savedState.push(wine);
      dbRef.push(wine);
    }
    //Update state
    this.setState({
      saved: savedState
    });
  }

  removeThisWine(wine) {
    const savedState = this.state.saved;
    const dbRef = firebase.database().ref(this.state.uid);
    for (let i = 0; i < savedState.length; i++) {
      dbRef.remove();
      if (wine === savedState[i]) {
        savedState.splice(i, 1);
      }
    }
    this.setState({
      saved: savedState
    });
    for (let i = 0; i < savedState.length; i++) {
      dbRef.push(savedState[i]);
    }
  }
  render() {
    return (
	<Router>
      <div>
		<Route 
			path="/" 
			render={(props) => <Login {...props} 
				loginWithGoogle={this.loginWithGoogle}
				logout={this.logout}
				loggedIn={this.state.loggedIn}
				userName={this.state.userName}
				user={this.state.user}
				userImage={this.state.userImage}
			/>} 
		/>
		<Route exact path="/" component={Header} />
		<Route exact path="/" component={VineyardList} />
		
		<Route 
			path="/vineyards/:wines" 
			render={ (props) => <OneVineyard {...props} 
				saveThisWine={this.saveThisWine}
				saved={this.state.saved}
				uid={this.state.uid}
				loggedIn={this.state.loggedIn}
			/> }
		/>

		<Route 
			path="/vineyards/:wines"
			render={ (props) => <SavedWines {...props}
				saved={this.state.saved}
				removeThisWine={this.removeThisWine}				
			/>}
		/>
        {/* <Login
          loginWithGoogle={this.loginWithGoogle}
          logout={this.logout}
          loggedIn={this.state.loggedIn}
          userName={this.state.userName}
          user={this.state.user}
          userImage={this.state.userImage}
        />
        <OneVineyard
          wines={this.state.wines}
          saveThisWine={this.saveThisWine}
          saved={this.state.saved}
          uid={this.state.uid}
          loggedIn={this.state.loggedIn}
        />
        <SavedWines
          saved={this.state.saved}
          removeThisWine={this.removeThisWine}
        /> */}
      </div>
	</Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
