import { useState, useRef, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CoffeeShopList from "../CoffeeShopList/CoffeeShopList";
import BackToTop from "../BackToTop/BackToTop";
import {
  geocodeCity,
  findCoffeeShops,
  getUserLocation,
  reverseGeocode,
} from "../../utils/api";
import "./Home.css";

function Home() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchLocation, setLastSearchLocation] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isLoading]);

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
    } catch (err) {
      setError(
        err.message || "Failed to search for coffee shops. Please try again."
      );
      console.error("Search error:", err);
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
    } catch (err) {
      setError(err.message || "Failed to get your location. Please try again.");
      console.error("Location error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="home">
      <SearchForm onSearch={handleSearch} onUseLocation={handleUseLocation} />
      <div ref={resultsRef}>
        {lastSearchLocation && (
          <div className="home__results-header">
            <div className="home__results-container">
              <p className="home__results-text">
                Results for: <strong>{lastSearchLocation}</strong>
              </p>
            </div>
          </div>
        )}
        <CoffeeShopList
          coffeeShops={coffeeShops}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {(coffeeShops.length > 0 || error) && <BackToTop />}
    </main>
  );
}

export default Home;
