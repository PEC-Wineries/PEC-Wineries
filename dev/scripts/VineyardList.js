import React from "react";
import Header from "./Header";
import { Route, Link } from "react-router-dom";

const vineyards = [];
const east = [
  {
    name: "County Cider Company",
    searchTerm: ""
  },
  {
    name: "Three Dog Wine",
    searchTerm: ""
  },
  {
    name: "Waupoos Estates Winery",
    searchTerm: ""
  }
];
const central = [
  {
    name: "Lighthall Vineyards",
    searchTerm: ""
  },
  {
    name: "Black Prince Winery",
    searchTerm: ""
  },
  {
    name: "Huff Estates Winery",
    searchTerm: ""
  }
];
const hillier = [
  {
    name: "By Chadsey's Cairns Winery",
    searchTerm: ""
  },
  {
    name: "Casa - Dea Estates Winery",
    searchTerm: ""
  },
  {
    name: "Closson Chase Vineyards",
    searchTerm: ""
  },
  {
    name: "Domaine Darius",
    searchTerm: ""
  },
  {
    name: "The Grange of Prince Edward Vineyards and Winery",
    searchTerm: ""
  },
  {
    name: "Harwood Estate Vineyards",
    searchTerm: ""
  },
  {
    name: "Hillier Creek Estates",
    searchTerm: ""
  },
  {
    name: "Hinterland Wine Company",
    searchTerm: ""
  },
  {
    name: "Hubbs Creek Vineyard",
    searchTerm: ""
  },
  {
    name: "Karlo Estates",
    searchTerm: ""
  },
  {
    name: "Lacey Estates Winery",
    searchTerm: ""
  },
  {
    name: "Lift Haus Winery",
    searchTerm: ""
  },
  {
    name: "Norman Hardie Winery",
    searchTerm: ""
  },
  {
    name: "Redtail Vineyard",
    searchTerm: ""
  },
  {
    name: "Rosehall Run Vineyards",
    searchTerm: ""
  },
  {
    name: "Sandbanks Estate Winery",
    searchTerm: "Sandbanks"
  },
  {
    name: "Stanners Vineyard",
    searchTerm: ""
  },
  {
    name: "Sugarbush Vineyards",
    searchTerm: ""
  },
  {
    name: "Terra Estate Winery",
    searchTerm: ""
  },
  {
    name: "The Old Third Vineyard",
    searchTerm: ""
  },
  {
    name: "Trail Estate Winery",
    searchTerm: ""
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
                    <Link to="/vylist" className="vineyard-name">
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
