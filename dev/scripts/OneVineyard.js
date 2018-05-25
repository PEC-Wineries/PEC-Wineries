import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class OneVineyard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="vineyard-wines">
          {console.log(this.props.wines)}
          {this.props.wines.map(wine => {
            return (
              <React.Fragment>
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
                  </ul>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default OneVineyard;
