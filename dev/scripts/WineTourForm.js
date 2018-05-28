import React from "react";

class WineTourForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form action="" id="wineTour" onSubmit={this.props.submitTourForm}>
          <h2>Register for a Wine Tour</h2>
          <label htmlFor="guestName">Name: </label>
          <input
            type="text"
            required
            name="guestName"
            id="guestName"
            onChange={this.props.handleChange}
          />
          <label htmlFor="guests">Guests: </label>
          <input
            type="number"
            id="guests"
            required
            onChange={this.props.handleChange}
            min="0"
          />
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            required
            onChange={this.props.handleChange}
          />
          <label htmlFor="notes">Comments</label>
          <textarea
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            onChange={this.props.handleChange}
          />
          <button type="submit">RSVP</button>
        </form>
      </React.Fragment>
    );
  }
}

export default WineTourForm;
