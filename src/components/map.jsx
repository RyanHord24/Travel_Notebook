import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import React,{useState} from 'react';
import countries from '/Users/miyapollard/Downloads/archive/countries.json';
import { useNavigate } from "react-router-dom";

const Map = ()=>{
    const navigate = useNavigate();

    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }

  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    layer.bringToFront();
  };

  const resetHighlight = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1,
      color: '#3388ff',
      fillOpacity: 0.2,
    });
  };

  const routeToCountryPage = (feature) => {
    const countryName = feature.properties.name;
    navigate(`/CountryPage/${countryName}`);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: (e) => routeToCountryPage(feature),
    });
  };


    return(
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="map_container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                border: '2px solid #333',
                width: '100%',
                height: '100%',
                margin: '25px',
            }}>
                <MapContainer center={[37.8, -96]}
                    zoom={3} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON data={countries}
                        style={{
                        weight: 1,
                        color: '#3388ff',
                        fillOpacity: 0.2,
                        }}
                        onEachFeature={onEachFeature}/>
                </MapContainer>
            </div>
        </div>

    )
}
export default Map;