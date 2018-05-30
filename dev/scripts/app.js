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
import VineyardLogin from "./VineyardLogin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LCBOmap from "./Map";

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
      uid: "placeholder",
      userImage: "none",
      //The states listed below are for the form section that will be sent to each vineyard for wine tours

      oneSubmission: {
        guestName: "",
        guests: "",
        date: "",
        notes: ""
      },
      accessCode: "",
      vineyardAccessCode: "none",
      vineyardLat: 0,
      vineyardLng: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveThisWine = this.saveThisWine.bind(this);
    this.removeThisWine = this.removeThisWine.bind(this);
    this.logout = this.logout.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.submitTourForm = this.submitTourForm.bind(this);
    this.getAccessCode = this.getAccessCode.bind(this);
    this.vineyardCodeChange = this.vineyardCodeChange.bind(this);
    this.vineyardLocation = this.vineyardLocation.bind(this);
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

  handleChange(e) {
    //This takes the value of the wine tour form and saves changes to the corresponding state
    let oneSubmission = Object.assign({}, this.state.oneSubmission);
    oneSubmission[e.target.id] = e.target.value;
    this.setState({
      oneSubmission
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

  submitTourForm(e) {
    e.preventDefault();
    const dbRef = firebase.database().ref(this.state.accessCode);
    dbRef.push(this.state.oneSubmission);
    this.setState({
      oneSubmission: {}
    });
    document.getElementById("wineTour").reset();
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

  getAccessCode(token) {
    // const dbRef = firebase.database().ref(`${this.state.uid}/accessCode`);
    // dbRef.remove();
    // this.setState(
    //   {
    //     accessCode: token
    //   },
    //   () => {
    //     dbRef.push(this.state.accessCode);
    //   }
    // );
  }

  vineyardCodeChange(e) {
    const vineyardCode = e.target.value;
    console.log(vineyardCode);
    this.setState({
      vineyardAccessCode: vineyardCode
    });
  }

  checkVineyard(e) {
    e.preventDefault();
    document.getElementById("vineyardLoginForm").reset();
  }

  vineyardLocation(lat, lng) {
    console.log(lat, lng);
    this.setState({
      vineyardLat: lat,
      vineyardLng: lng
    });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="header-container">
            <Route
              path="/"
              render={props => (
                <Login
                  {...props}
                  loginWithGoogle={this.loginWithGoogle}
                  logout={this.logout}
                  loggedIn={this.state.loggedIn}
                  userName={this.state.userName}
                  user={this.state.user}
                  userImage={this.state.userImage}
                />
              )}
            />
            {/* Added this section - needs to be routed */}
            {/* <Route
			path="/"
			render={ props => (
			<VineyardLogin
			{...props}
            vineyardCodeChange={this.vineyardCodeChange}
            checkVineyard={this.checkVineyard}
            vineyardAccessCode={this.state.vineyardAccessCode}
          />)}
			/> */}
            <Route exact path="/" render={() => <Header />} />
            <Route
              exact
              path="/"
              render={props => (
                <VineyardList
                  {...props}
                  getAccessCode={this.getAccessCode}
                  vineyardLocation={this.vineyardLocation}
                />
              )}
            />
            <Route
              path="/vineyards/:wines"
              render={props => (
                <OneVineyard
                  {...props}
                  saveThisWine={this.saveThisWine}
                  saved={this.state.saved}
                  uid={this.state.uid}
                  loggedIn={this.state.loggedIn}
                  submission={this.state.submission}
                  name={this.state.guestName}
                  amount={this.state.amount}
                  date={this.state.date}
                  notes={this.state.notes}
                  handleChange={this.handleChange}
                  submitTourForm={this.submitTourForm}
                />
              )}
            />

            <Route
              path="/vineyards/:wines"
              render={props => (
                <LCBOmap
                  {...props}
                  lat={this.state.vineyardLat}
                  lng={this.state.vineyardLng}
                />
              )}
            />

            <Route
              path="/vineyards/:wines"
              render={props =>
                this.state.loggedIn === true ? (
                  <SavedWines
                    {...props}
                    saved={this.state.saved}
                    removeThisWine={this.removeThisWine}
                  />
                ) : null
              }
            />
          </div>

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
