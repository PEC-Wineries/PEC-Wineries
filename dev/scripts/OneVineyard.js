import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import WineTourForm from "./WineTourForm";

class OneVineyard extends React.Component {
  constructor() {
    super();
    this.state = {
      wines: []
    };
  }
  componentDidMount() {
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: this.props.match.params.wines
      }
    }).then(res => {
      this.setState({
        wines: res.data.result
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="vineyard-wines">
          {/* {console.log(this.props.wines)} */}
          {this.state.wines.map(wine => {
            return (
              <div className="display-wine" key={wine.id}>
                <div
                  className="wine-image"
                  key={`wine-image-section = ${wine.id}`}
                >
                  <img
                    src={wine.image_thumb_url}
                    alt={wine.name}
                    key={`wine-image = ${wine.id}`}
                  />
                </div>
                <div
                  className="wine-info"
                  key={`wine-info-section = ${wine.id}`}
                >
                  <ul>
                    <li className="one-wine-name" key={`name = ${wine.id}`}>
                      {wine.name}
                    </li>
                    <li
                      className="one-wine-type"
                      key={`type = ${wine.varietal}`}
                    >
                      {wine.varietal}
                    </li>
                    <li
                      className="one-wine-description"
                      key={`description = ${wine.id}`}
                    >
                      {wine.tasting_note}
                    </li>
                    {this.props.loggedIn === true ? (
                      <button onClick={() => this.props.saveThisWine(wine)}>
                        Save This Wine
                      </button>
                    ) : null}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <WineTourForm
          handleChange={this.props.handleChange}
          submitTourForm={this.props.submitTourForm}
        />
      </React.Fragment>
    );
  }
}

export default OneVineyard;
