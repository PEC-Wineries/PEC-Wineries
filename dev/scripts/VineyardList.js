import React from 'react';
import Header from './Header';
import {
	Route, Link
} from 'react-router-dom';

const vineyards = [];
const east = [
	{
		name: "County Cider Company",
		searchTerm: "County Cider Company",
	},
	{
		name: "Three Dog Wine",
		searchTerm: "Three Dog",
	},
	{
		name: "Waupoos Estates Winery",
		searchTerm: "Waupoos",
	},
];
const central = [
	{
		name: "Lighthall Vineyards",
		searchTerm: "Lighthall",
	},
	{
		name: "Black Prince Winery",
		searchTerm: "Black Prince",
	},
	{
		name: "Huff Estates Winery",
		searchTerm: "Huff",
	},
];
const hillier = [
	{
		name: "By Chadsey's Cairns Winery",
		searchTerm: "By Chadsey",
	},
	{
		name: "Casa - Dea Estates Winery",
		searchTerm: "Casa-Dea",
	},
	{
		name: "Closson Chase Vineyards",
		searchTerm: "Closson Chase",
	},
	{
		name: "The Grange of Prince Edward Vineyards and Winery",
		searchTerm: "The Grange",
	},
	{
		name: "Harwood Estate Vineyards",
		searchTerm: "Harwood Estate",
	},
	{
		name: "Hillier Creek Estates",
		searchTerm: "Hillier Creek",
	},
	{
		name: "Hinterland Wine Company",
		searchTerm: "Hinterland",
	},
	{
		name: "Karlo Estates",
		searchTerm: "Karlo Estates",
	},
	{
		name: "Norman Hardie Winery",
		searchTerm: "Norman Hardie",
	},
	{
		name: "Redtail Vineyard",
		searchTerm: "Redtail",
	},
	{
		name: "Rosehall Run Vineyards",
		searchTerm: "Rosehall Run",
	},
	{
		name: "Sandbanks Estate Winery",
		searchTerm: "Sandbanks",
	},
	{
		name: "Stanners Vineyard",
		searchTerm: "Stanners",
	},
	{
		name: "Sugarbush Vineyards",
		searchTerm: "Sugarbush",
	},
	{
		name: "Trail Estate Winery",
		searchTerm: "Trail Estate Winery",
	}
];

vineyards.push(east, central, hillier);

const regionName = ["east", "central", "hillier"];
class VineyardList extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<section className="vineyard-list">
				{vineyards.map((region, i) => {
				return (
						<div className={`region-container ${regionName[i]}`}>
							<h1>{regionName[i]}</h1>
							<div className="vineyard-containers">
								{region.map((vineyard) => {
									return (
										<Link to={`/vineyards/${vineyard.searchTerm}`} className="vineyard-name">{vineyard.name}</Link>
									)
								})}
							</div>
						</div>
					)
				})}
			</section>	
		)
	}
}

export default VineyardList;