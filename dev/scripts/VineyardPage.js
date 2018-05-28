import React from "react";
import Rebase from "re-base";
import firebase from "firebase";

class VineyardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      reservations: []
    };
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref(this.props.vineyardAccessCode);
    this.dbRef.on("value", snapshot => {
      const rsvp = snapshot.val();
      const savedRSVP = [];
      for (let item in rsvp) {
        savedRSVP.push(rsvp[item]);
      }
      this.setState({
        reservations: savedRSVP
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="reservations">
          <h2>Your Wine Tours: </h2>
          {this.state.reservations.map((rsvp, key) => {
            return (
              <ul>
                <li key={`name - ${key}`}>{rsvp.guestName}</li>
                <li key={`guests - ${key}`}>{rsvp.guests}</li>
                <li key={`date - ${key}`}>{rsvp.date}</li>
                <li key={`notes - ${key}`}>{rsvp.notes}</li>
              </ul>
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default VineyardPage;
