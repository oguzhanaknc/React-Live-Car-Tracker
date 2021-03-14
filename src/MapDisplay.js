import React, { Component } from 'react'
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';





export default class MapDisplay extends Component {
    state = {
        lat: 41.257017,
        lng: 29.077524,
        zoom: 13,
    }


    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <MapContainer center={position} zoom={this.state.zoom} style={{height : '400px'}}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Son Konum
                    </Popup>
                </Marker>
            </MapContainer>
        )
    }
}