import NavBar from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/NavBar.jsx";
import Map from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/map";
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            alert("You must be logged in to access this page.");
            navigate("/");
        }
    }, [navigate]);
    
    return (
        <>
        <NavBar />
        <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
            <h1 className="text-4xl font-bold mb-4 mt-4">World Map</h1>
            <h3 className="text-lg text-center m-2 p-4">Scroll around the world and choose where you want to travel! Travel Notebook is happy to provide its users with an interactive world map, featuring countries all around the globe for you to explore.</h3>
            <div className="w-full max-w-5xl">
            <Map />
            </div>
        </div>
        </>
    )
 }

export default MapPage