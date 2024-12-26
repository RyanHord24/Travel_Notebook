import NavBar from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AboutPage = () => {
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
            <h1 className="pl-2">About Page</h1>
            <h3 className="pl-2">There are countless amazing travel destinations that the world has to offer. Sometimes they are in places that you would never have considered without taking the chance to look. Travel Notebook solves this issue by offering an interactive map in React-Leaflet that will allow users to scroll across the whole world. The map will feature on-click functionality to route to a detailed web page offering travel details for that destination. The user will then be able to save their favorites and create their own itineraries!</h3>
            <div className="flex justify-center p-4">
            <img className="rounded-xl" src='https://media.istockphoto.com/id/1184663665/photo/empty-airport-terminal-waiting-area.jpg?s=612x612&w=0&k=20&c=5gszlfWOH-UnaWR1ocw2KFGo0VrDpTthU5qiZUCDoXo='></img>
            </div>
        </>
    )
 }

export default AboutPage