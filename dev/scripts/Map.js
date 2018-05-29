import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import ReactGoogleMap from './ReactGoogleMap';

// import $ from 'jquery';

// May have to place handleLocate in app.js because we can't get the state outside this component, pass geolocate into a prop to be used inside Map.js

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            pos: "",
            lcboList: {}      
        }
        this.getLCBO = this.getLCBO.bind(this);
        this.handleLocate = this.handleLocate.bind(this);
    }
    // === API Request to find LCBOs in the area near the coordinates stored in 'const location'
    getLCBO(location) {
        axios({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method: 'GET',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                params: {
                        key: 'AIzaSyAjM2iAW0ZIFyotMj1JJV53Inq595q54kw',
                        location: location,
                        keyword: 'LCBO',
                        // radius: 1000,
                        rankby: 'distance'
                        // opennow: true
                    },
                }    
            }
            )
            .then((res) => {
                // console.log('This is the then response');
                // console.log(res);
                this.setState({
                    lcboList: res
                })
            })
            
            .catch((err) => {
                console.log('This is the error response');
                console.log(err);
            });
    }
    // === Using the Google Geolocation API request to get coordinates of the user - to then be used to locate the users coordinates to then be passed to ReactGoogleMap to find LCBOs in the area
    // handleLocate(e, newPostion) {
    handleLocate() {
        navigator.geolocation.getCurrentPosition((pos) => {
            const location = `${pos.coords.latitude},${pos.coords.longitude}`;
            this.getLCBO(location);
            this.setState({
                pos: {lat: pos.coords.latitude, lng: pos.coords.longitude}
            })
        })
    }
    render () {
        return (
            <div>
{/* button with onClick to find the users location coordinates */}
                <button className='userPosition' onClick={() => this.handleLocate(this.state.pos)}
                // newCoordinate = {this.state.pos}
                >Find nearby Stores</button>
                <ReactGoogleMap 
                    newCoordinate = {this.state.pos}
                    nearbyStores = {this.state.lcboList}
                />
            </div>
        )
    }
}

export default Map;
