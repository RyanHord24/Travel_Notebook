import axios from "axios";
import React from 'react';
import FavoriteCard from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/FavoriteCard.jsx";
import { useEffect, useState } from "react";
import NavBar from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/NavBar.jsx";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
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

    useEffect(() => {
        const fetchFavorites = async () => {
            const authToken = localStorage.getItem("authToken");
            try {
                const response = await axios.get('http://localhost:8000/api/v1/favorites/', {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                });
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleUpdate = (updatedFavorite) => {
        setFavorites((prevFavorites) =>
            prevFavorites.map((favorite) =>
                favorite.id === updatedFavorite.id ? updatedFavorite : favorite
            )
        );
    };

    const handleDelete = (deletedFavoriteId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite.id !== deletedFavoriteId)
        );
    };

    return (
        <>
        <NavBar />
        <h1 className="pl-2">Favorites</h1>
        <h3 className="pl-2">Your favorites that you selected from the world map will appear here. Feel free to adjust your travel dates for your destinations. In addition, you can create a notebook for a favorite to begin developing your itineraries for your trips!</h3>
        <div className="favorite-list">
        <ul style={{
                display: "flex", 
                flexWrap: "wrap", 
                gap: "1rem", 
                justifyContent: "center"
                }}>
                {favorites.map((favorite) => (
                    <FavoriteCard key={favorite.id} favorite={favorite} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
        </ul>
        </div>
        </>
    );
};

export default FavoritesPage;