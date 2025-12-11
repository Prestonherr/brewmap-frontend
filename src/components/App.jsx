import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import About from "./About/About";
import Footer from "./Footer/Footer";
import {
  geocodeCity,
  findCoffeeShops,
  getUserLocation,
  reverseGeocode,
} from "../utils/api";
import "./App.css";

function App() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchLocation, setLastSearchLocation] = useState(null);

  const handleSearch = async (city, radius) => {
    setIsLoading(true);
    setError(null);
    setCoffeeShops([]);
    setLastSearchLocation(null);

    try {
      const location = await geocodeCity(city);

      const shops = await findCoffeeShops(location.lat, location.lon, radius);

      setCoffeeShops(shops);
      setLastSearchLocation(location.displayName);
    } catch (error) {
      let userMessage = "Failed to search for coffee shops. Please try again.";

      if (error.message) {
        if (error.message.includes("not found")) {
          userMessage = `City "${city}" not found. Please check the spelling and try again.`;
        } else if (error.message.includes("Geocoding failed")) {
          userMessage =
            "Unable to find the city. Please check your internet connection and try again.";
        } else if (error.message.includes("Overpass API failed")) {
          userMessage =
            "Unable to search for coffee shops at this time. Please try again later.";
        } else {
          userMessage = error.message;
        }
      }

      setError(userMessage);
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLocation = async (radius) => {
    setIsLoading(true);
    setError(null);
    setCoffeeShops([]);
    setLastSearchLocation(null);

    try {
      const userLocation = await getUserLocation();

      const locationInfo = await reverseGeocode(
        userLocation.lat,
        userLocation.lon
      );

      const shops = await findCoffeeShops(
        userLocation.lat,
        userLocation.lon,
        radius
      );

      setCoffeeShops(shops);
      setLastSearchLocation(locationInfo.displayName);
    } catch (error) {
      let userMessage = "Failed to get your location. Please try again.";

      if (error.message) {
        if (error.message.includes("not supported")) {
          userMessage =
            "Your browser does not support location services. Please use the city search instead.";
        } else if (
          error.message.includes("denied") ||
          error.message.includes("Permission")
        ) {
          userMessage =
            "Location access was denied. Please enable location permissions in your browser settings and try again.";
        } else if (error.message.includes("unavailable")) {
          userMessage =
            "Location information is currently unavailable. Please try again or use the city search instead.";
        } else if (
          error.message.includes("timeout") ||
          error.message.includes("Timeout")
        ) {
          userMessage =
            "Location request timed out. Please try again or use the city search instead.";
        } else if (error.message.includes("Overpass API failed")) {
          userMessage =
            "Unable to search for coffee shops at this time. Please try again later.";
        } else {
          userMessage = error.message;
        }
      }

      setError(userMessage);
      console.error("Location error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                coffeeShops={coffeeShops}
                isLoading={isLoading}
                error={error}
                lastSearchLocation={lastSearchLocation}
                onSearch={handleSearch}
                onUseLocation={handleUseLocation}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
