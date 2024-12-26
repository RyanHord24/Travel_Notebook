import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import CountryPage from "./pages/CountryPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import NotebookPage from "./pages/NotebookPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
          index: true,
          element: <SignUp />,
        },
        {
          path: "about", 
          element: <AboutPage />,
        },
      ]
  },
  {
    path: "MapPage",
    element: <MapPage />,
   },
   {
    path: "CountryPage/:countryName",
    element: <CountryPage />,
   },
   {
    path: "FavoritesPage",
    element: <FavoritesPage />,
   },
   {
    path: "NotebookPage",
    element: <NotebookPage />,
   },     
    ]);

export default router;
