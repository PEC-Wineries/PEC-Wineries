import React from 'react';
import axios from 'axios';
import Qs from 'qs';

class ReactGoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: { lat: 44.410970, lng: -79.692821 }
        }
        this.updateMap = this.updateMap.bind(this);
        this.map = new google.maps.Map(document.getElementById('map'), { zoom: 16, center: this.state.pos });
        this.marker = new google.maps.Marker({ position: this.state.pos, map: map });
    }
// === Initializing the Map to then be displayed on the page ===
    // initMap() {
    //     // const hackerYou = { lat: 43.648478, lng: -79.397859 };

    //     let map = new google.maps.Map(
    //         document.getElementById('map'), { zoom: 16, center: this.state.pos }); 
    //     let marker = new google.maps.Marker({position: this.state.pos, map: map});

    //     this.setState({
    //         map: map,
    //         marker: marker
    //     });
    // }
// === Update the map with new center: '', and new marker: '' ===
    updateMap(pos) { 
        this.props.newCoordinate
    }
        // let map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: this.props.newCoordinate});
        // let marker = new google.maps.Marker({position: this.state.pos, map: map});\

// === Rendering the Google Map to the page ===
    // componentDidMount() {
    //     this.initMap();
        
    //         }
    render(){
        return (
            <div>
                <h3>Map Component</h3>
                <p>Your position is {this.props.newCoordinate}</p>
                <div id="map"></div>
            </div>
        )
    }
    componentDidUpdate(pos) {
        updateMap(this.props.newCoordinate);
        console.log(this.props.newCoordinate);
    }
}

export default ReactGoogleMap;