import React from "react";
import Header from "./Header";
import { Route, Link } from "react-router-dom";

const vineyards = [];
const east = [
  {
    name: "County Cider Company",
    searchTerm: "County Cider Company",
    accessCode: "ccc",
    lat: 44.020863,
    lng: -76.962874
  },
  {
    name: "Three Dog Wine",
    searchTerm: "Three Dog",
    accessCode: "three-dog",
    lat: 44.12915,
    lng: -77.115993
  },
  {
    name: "Waupoos Estates Winery",
    searchTerm: "Waupoos",
    accessCode: "waupoos",
    lat: 44.014865,
    lng: -76.971749
  }
];
const central = [
  {
    name: "Lighthall Vineyards",
    searchTerm: "Lighthall",
    accessCode: "lighthall",
    lat: 43.891635,
    lng: -77.122753
  },
  {
    name: "Black Prince Winery",
    searchTerm: "Black Prince",
    accessCode: "black-prince",
    lat: 43.999184,
    lng: -77.166287
  },
  {
    name: "Huff Estates Winery",
    searchTerm: "Huff",
    accessCode: "huff",
    lat: 44.015186,
    lng: -77.289017
  }
];
const hillier = [
  {
    name: "By Chadsey's Cairns Winery",
    searchTerm: "By Chadsey",
    accessCode: "bccw",
    lat: 43.945467,
    lng: -77.404235
  },
  {
    name: "Casa - Dea Estates Winery",
    searchTerm: "Casa-Dea",
    accessCode: "casa-dea",
    lat: 43.949804,
    lng: -77.441972
  },
  {
    name: "Closson Chase Vineyards",
    searchTerm: "Closson Chase",
    accessCode: "closson",
    lat: 43.999368,
    lng: -77.393642
  },
  {
    name: "Harwood Estate Vineyards",
    searchTerm: "Harwood Estate",
    accessCode: "harwood",
    lat: 43.970529,
    lng: -77.469985
  },
  {
    name: "Hillier Creek Estates",
    searchTerm: "Hillier Creek",
    accessCode: "hillier",
    lat: 43.97121,
    lng: -77.463224
  },
  {
    name: "Hinterland Wine Company",
    searchTerm: "Hinterland",
    accessCode: "hinterland",
    lat: 43.984128,
    lng: -77.421654
  },
  {
    name: "Karlo Estates",
    searchTerm: "Karlo Estates",
    accessCode: "karlo",
    lat: 43.967355,
    lng: -77.37202
  },
  {
    name: "Norman Hardie Winery",
    searchTerm: "Norman Hardie",
    accessCode: "hardie",
    lat: 43.955433,
    lng: -77.445605
  },
  {
    name: "Redtail Vineyard",
    searchTerm: "Redtail",
    accessCode: "redtail",
    lat: 43.973927,
    lng: -77.526322
  },
  {
    name: "Rosehall Run Vineyards",
    searchTerm: "Rosehall Run",
    accessCode: "rosehall",
    lat: 43.951869,
    lng: -77.448539
  },
  {
    name: "Sandbanks Estate Winery",
    searchTerm: "Sandbanks",
    accessCode: "sandbanks",
    lat: 43.937824,
    lng: -77.41604
  },
  {
    name: "Stanners Vineyard",
    searchTerm: "Stanners",
    accessCode: "stanners",
    lat: 43.974866,
    lng: -77.451264
  },
  {
    name: "Sugarbush Vineyards",
    searchTerm: "Sugarbush",
    accessCode: "sugarbush",
    lat: 43.992181,
    lng: -77.34789
  },
  {
    name: "Trail Estate Winery",
    searchTerm: "Trail Estate Winery",
    accessCode: "trail",
    lat: 43.9793,
    lng: -77.418731
  },
  {
    name: "The Grange of Prince Edward Vineyards and Winery",
    searchTerm: "The Grange",
    accessCode: "grange",
    lat: 43.991254,
    lng: -77.413151
  }
];

vineyards.push(hillier, east, central);

const regionName = ["hillier", "east", "central"];
class VineyardList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <section className="vineyard-list">
        <div className="wrapper">
          {vineyards.map((region, i) => {
            return (
              <div className={`region-container ${regionName[i]}`}>
                <h1>{regionName[i]}</h1>
                <div className="vineyard-containers">
                  {region.map(vineyard => {
                    return (
                      <Link
                        to={`/vineyards/${vineyard.searchTerm}`}
                        className="vineyard-name"
                        onClick={() => {
                          this.props.getAccessCode(vineyard.accessCode);
                          this.props.vineyardLocation(
                            vineyard.lat,
                            vineyard.lng
                          );
                        }}
                      >
                        {vineyard.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default VineyardList;
