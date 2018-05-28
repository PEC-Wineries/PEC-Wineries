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
        this.lcboMarkers = this.lcboMarkers.bind(this);
    }

// === Update the map with new center: '', and new marker: '' ===
    updateMap(pos) { 
        this.map.panTo(pos);
// Remove Previous Marker
        this.marker.setMap(null);
// Place New marker at new position
        this.marker = new google.maps.Marker({ position: this.props.newCoordinate, map: this.map });
    }

    lcboMarkers() {
        let infoWindow = new google.maps.InfoWindow(), marker, i;
        // console.log((this.props.nearbyStores).data.results);
        let bounds = new google.maps.LatLngBounds();

        let stores = this.props.nearbyStores;
        // let stores = async () => {
        //     let wait = await this.props.nearbyStores
        //     return wait;
        // }
        console.log(stores);
    //    Looping through array of LCBOs and setting markers at their positions on Map
        if (this.props.nearbyStores.data != undefined) {
            // for (i = 0; i < this.props.nearbyStores.data.results.length; i++) {
            //     console.log(this.props.nearbyStores.data.results[i]);
            //     const position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            //     bounds.extend(position);
            //     marker = new google.maps.Marker({
            //         position: position,
            //         map: map,
            //         title: markers[i][0]
            //     });
            for (i = 0; i < this.props.nearbyStores.data.results.length; i++) {
                console.log(this.props.nearbyStores.data.results[i]);
                const position = new google.maps.LatLng(this.props.nearbyStores.data.results[i][1], this.props.nearbyStores.data.results[i][2]);
                // bounds.extend(position);
                bounds.extend(this.props.newCoordinate);
                marker = new google.maps.Marker({
                    position: this.props.newCoordinate,
                    map: this.map,
                    title: this.props.nearbyStores.data.results[i][0]
                });
                // if (this.props.nearbyStores.data.results.length > 0) {
                //     console.log(this.props.nearbyStores.data.results);
                // }
            }

        }
    }

// === Rendering the Google Map to the page ===
    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), { zoom: 16, center: this.state.pos });
        this.marker = new google.maps.Marker({ position: this.state.pos, map: this.map });
        }
    componentDidUpdate(pos) {
    // Calling updateMap 
        this.updateMap(this.props.newCoordinate);
        // this.marker.updateMap(this.props.newCoordinate);
        this.lcboMarkers(this.props.newCoordinate);
    }
    render(){
        return (
            <div>
                <h3>Map Component</h3>
                <div id="map"></div>
            </div>
        )
    }
}

export default ReactGoogleMap;