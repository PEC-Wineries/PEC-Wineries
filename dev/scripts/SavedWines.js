import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import firebase from "firebase";
import Rebase from "re-base";

class SavedWines extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="saved-wines">
          {this.props.saved.map(wine => {
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
                    <button onClick={() => this.props.removeThisWine(wine)}>
                      Remove This Wine
                    </button>
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

export default SavedWines;
