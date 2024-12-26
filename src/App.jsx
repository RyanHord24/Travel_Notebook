import React,  { useEffect } from 'react';
import './App.css';
import Map from './components/map';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from "react-router-dom";
import '/Users/miyapollard/Desktop/leaflet_proj-3/src/index.css'

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

   return(
     <div>
       <Outlet />
     </div>
  );
};
export default App;
