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
      wines: [],
      vinyardName: ""
    };
  }
  componentDidMount() {
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDo2YTM3NTlhNC02NDIxLTExZTgtYmM5ZS04YjU2YTdiMGU4YjE6WW5YQjA0Q3lhaWdvRXRVZk1ZUTA3MThCa3U0YWF0b1gzWWRR",
        q: this.props.match.params.wines
      }
    }).then(res => {
      this.setState({
        wines: res.data.result,
        vinyardName: res.data.result[0].producer_name
      });
      console.log(this.state.wines);
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="vineyard-wines clearfix wrapper">
          <h1>{this.state.vinyardName}</h1>
          {this.state.wines.map(wine => {
            return (
              <React.Fragment>
                {wine.image_url !== null ? (
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
                        {/* {wine.varietal !== null ? (
                          <li
                            className="one-wine-type"
                            key={`type = ${wine.varietal}`}
                          >
                            {wine.varietal}
                          </li>
                        ) : (
                          <li> </li>
                        )} */}
                        {/* <li
                          className="one-wine-description"
                          key={`description = ${wine.id}`}
                        >
                          {wine.tasting_note}
                        </li> */}
                        {this.props.loggedIn === true ? (
                          <button
                            className="save-wine"
                            onClick={() => this.props.saveThisWine(wine)}
                          >
                            Save This Wine
                          </button>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
        {/* <WineTourForm
          handleChange={this.props.handleChange}
          submitTourForm={this.props.submitTourForm}
        /> */}
      </React.Fragment>
    );
  }
}

export default OneVineyard;
