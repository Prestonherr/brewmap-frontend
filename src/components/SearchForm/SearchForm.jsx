import { useState } from "react";
import {
  SEARCH_RADIUS_OPTIONS,
  DEFAULT_SEARCH_RADIUS,
} from "../../config/constants.js";
import "./SearchForm.css";

function SearchForm({ onSearch, onUseLocation }) {
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState(DEFAULT_SEARCH_RADIUS);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim(), radius);
    }
  };

  const handleUseLocation = async () => {
    setIsGettingLocation(true);
    try {
      await onUseLocation(radius);
    } catch (error) {
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <h2 className="search-form__title">Find Coffee Shops Near You</h2>
        <p className="search-form__subtitle">
          Enter a city name or click the location icon
        </p>
        <form className="search-form__form" onSubmit={handleSubmit}>
          <div className="search-form__input-group">
            <label htmlFor="city" className="search-form__label">
              City
            </label>
            <div className="search-form__input-wrapper">
              <button
                type="button"
                className="search-form__location-button"
                onClick={handleUseLocation}
                disabled={isGettingLocation}
                aria-label="Use my current location"
                title="Use my current location"
              >
                {isGettingLocation ? (
                  <svg
                    className="search-form__location-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="31.416"
                      strokeDashoffset="31.416"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        dur="2s"
                        values="0 31.416;15.708 15.708;0 31.416;0 31.416"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-dashoffset"
                        dur="2s"
                        values="0;-15.708;-31.416;-31.416"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                ) : (
                  <svg
                    className="search-form__location-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
              <input
                id="city"
                type="text"
                className="search-form__input search-form__input--with-icon"
                placeholder="e.g., Denver, New York, San Francisco..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="search-form__input-group">
            <label htmlFor="radius" className="search-form__label">
              Search Radius (miles)
            </label>
            <select
              id="radius"
              className="search-form__select"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            >
              {SEARCH_RADIUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} {option === 1 ? "mile" : "miles"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="search-form__button"
            disabled={!city.trim()}
          >
            Search Coffee Shops
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
