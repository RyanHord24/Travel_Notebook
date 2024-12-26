import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryCard from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/CountryCard.jsx";
import countries from '/Users/miyapollard/Downloads/archive/countries.json';
import { useNavigate } from "react-router-dom";
import NavBar from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/NavBar.jsx";


const CountryPage = () => {
    const [countryData, setCountryData] = useState(null);
    const { countryName } = useParams();
    const [formData, setFormData] = useState({
        travel_start_date: "",
        travel_end_date: "",
        is_favorite: false,
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            alert("You must be logged in to access this page.");
            navigate("/");
        }
    }, [navigate]);

    const createNotebook = async (country_id) => {
        const authToken = localStorage.getItem("authToken");
        const notebookPayload = {
            country_id: country_id
        };

        try {
            const response = await axios.post("http://localhost:8000/api/v1/notebook/country/", notebookPayload, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            console.log("Notebook created:", response.data);
            alert("Notebook created successfully!");
        } catch (error) {
            console.error("Error creating notebook:", error.message);
            alert("Failed to create notebook.");
        }
    };

    const getSelectedCountryId = () => {
        const feature = countries.features.find(
            (feature) => feature.properties.name === countryName
        );
        if (feature) {
            return feature.id;
        } else {
            console.error(`Country ${countryName} not found in GeoJSON.`);
            return null; 
        }
    };

    const selectedCountryId = getSelectedCountryId();

    const getCountryInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/api_app/country/${countryName}`);
            console.log("Response data:", response.data);
            setCountryData(response.data);
        } catch (error) {
            console.error("Error fetching country data:", error.message);
        }
    };

    useEffect(() => {
        getCountryInfo();
    }, [countryName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");
        console.log("Auth Token: ", authToken);
        try {
            const payload = {
                country_id: selectedCountryId,
                travel_start_date: formData.travel_start_date || null,
                travel_end_date: formData.travel_end_date || null,
            };
            const response = await axios.post("http://localhost:8000/api/v1/favorites/country/", payload, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            console.log("Favorite updated:", response.data);
            alert("Favorite updated successfully!");

        } catch (error) {
            console.error("Error updating favorite:", error.message);
            alert("Failed to update favorite.");
        }
    };

    return (
        <>
        <NavBar />
        <h1>{countryName}</h1>
        <form onSubmit={handleFormSubmit} style={{ marginTop: "2rem" }}>
        <h3>Update Travel Information for {countryName}</h3>
            <label>
                Travel Start Date:
                    <input
                    type="date"
                    name="travel_start_date"
                    value={formData.travel_start_date}
                    onChange={handleInputChange}
                />
                </label>
                 <br />
                <label>
                 Travel End Date:
                 <input
                    type="date"
                    name="travel_end_date"
                    value={formData.travel_end_date}
                    onChange={handleInputChange}
                />
                 </label>
                <br />
            <button type="submit">Add to Favorites</button>
        </form>
        <ul style={{
                display: "flex", 
                flexWrap: "wrap", 
                gap: "1rem", 
                justifyContent: "center"
                }}>
        {countryData?.results?.map((point, index) => (
          <CountryCard
            key={index}
            photoUrl={point.photo_url}
            name={point.name}
            vicinity={point.vicinity}/>
            ))}
        </ul>
        </>
    )
}
export default CountryPage;
