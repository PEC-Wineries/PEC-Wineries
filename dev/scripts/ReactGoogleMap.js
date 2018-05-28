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
    }

// === Update the map with new center: '', and new marker: '' ===
    updateMap(pos) { 
        this.map.panTo(pos);
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({ position: this.props.newCoordinate, map: this.map });
    }

// === Rendering the Google Map to the page ===
    componentDidMount() {
            this.map = new google.maps.Map(document.getElementById('map'), { zoom: 16, center: this.state.pos });
            this.marker = new google.maps.Marker({ position: this.state.pos, map: this.map });
            }
    render(){
        return (
            <div>
                <h3>Map Component</h3>
                <div id="map"></div>
            </div>
        )
    }
    componentDidUpdate(pos) {
        this.updateMap(this.props.newCoordinate);
        // this.marker.updateMap(this.props.newCoordinate);
        console.log(this.props.newCoordinate);
    }
}

export default ReactGoogleMap;