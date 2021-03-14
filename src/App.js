import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';



Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/';

const ENDPOINT = "http://127.0.0.1:4001"; //EndPoint for websocket
var position; //marker position (car location)
function App() {

    const [response, setResponse] = useState(""); //state for car data

    //get data
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
      position =  data.location.coordinates;
    });
  }, []);
if (position){ //if position not null
    return (
        <MapContainer center={position} fullscreenControl={true} cen zoom={8} style={{height:"100vh"}}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Device ID : {response.deviceID} <br/>

                    Speed : {response.speed}
                </Popup>
            </Marker>
        </MapContainer>
    );
}else { //if position null
    return (<div><h1>loading...</h1></div>)
}

}

export default App;