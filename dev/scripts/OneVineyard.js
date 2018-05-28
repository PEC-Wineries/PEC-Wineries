import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Login from "./Login";

class OneVineyard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="vineyard-wines">
          {/* {console.log(this.props.wines)} */}
          {this.props.wines.map(wine => {
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
      </React.Fragment>
    );
  }
}

export default OneVineyard;
