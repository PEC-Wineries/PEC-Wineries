import React from "react";
import Header from "./Header";
import { Route, Link } from "react-router-dom";

const vineyards = [];
const east = [
  {
    name: "County Cider Company",
    searchTerm: "County Cider Company",
    accessCode: "ccc"
  },
  {
    name: "Three Dog Wine",
    searchTerm: "Three Dog",
    accessCode: "three-dog"
  },
  {
    name: "Waupoos Estates Winery",
    searchTerm: "Waupoos",
    accessCode: "waupoos"
  }
];
const central = [
  {
    name: "Lighthall Vineyards",
    searchTerm: "Lighthall",
    accessCode: "lighthall"
  },
  {
    name: "Black Prince Winery",
    searchTerm: "Black Prince",
    accessCode: "black-prince"
  },
  {
    name: "Huff Estates Winery",
    searchTerm: "Huff",
    accessCode: "huff"
  }
];
const hillier = [
  {
    name: "By Chadsey's Cairns Winery",
    searchTerm: "By Chadsey",
    accessCode: "bccw"
  },
  {
    name: "Casa - Dea Estates Winery",
    searchTerm: "Casa-Dea",
    accessCode: "casa-dea"
  },
  {
    name: "Closson Chase Vineyards",
    searchTerm: "Closson Chase",
    accessCode: "closson"
  },
  {
    name: "The Grange of Prince Edward Vineyards and Winery",
    searchTerm: "The Grange",
    accessCode: "grange"
  },
  {
    name: "Harwood Estate Vineyards",
    searchTerm: "Harwood Estate",
    accessCode: "harwood"
  },
  {
    name: "Hillier Creek Estates",
    searchTerm: "Hillier Creek",
    accessCode: "hillier"
  },
  {
    name: "Hinterland Wine Company",
    searchTerm: "Hinterland",
    accessCode: "hinterland"
  },
  {
    name: "Karlo Estates",
    searchTerm: "Karlo Estates",
    accessCode: "karlo"
  },
  {
    name: "Norman Hardie Winery",
    searchTerm: "Norman Hardie",
    accessCode: "hardie"
  },
  {
    name: "Redtail Vineyard",
    searchTerm: "Redtail",
    accessCode: "redtail"
  },
  {
    name: "Rosehall Run Vineyards",
    searchTerm: "Rosehall Run",
    accessCode: "rosehall"
  },
  {
    name: "Sandbanks Estate Winery",
    searchTerm: "Sandbanks",
    accessCode: "sandbanks"
  },
  {
    name: "Stanners Vineyard",
    searchTerm: "Stanners",
    accessCode: "stanners"
  },
  {
    name: "Sugarbush Vineyards",
    searchTerm: "Sugarbush",
    accessCode: "sugarbush"
  },
  {
    name: "Trail Estate Winery",
    searchTerm: "Trail Estate Winery",
    accessCode: "trail"
  }
];

vineyards.push(east, central, hillier);

const regionName = ["east", "central", "hillier"];
class VineyardList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return (
      <section className="vineyard-list">
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
                    >
                      {vineyard.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default VineyardList;
