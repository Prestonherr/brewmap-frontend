// API
export const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
export const NOMINATIM_USER_AGENT = "BrewMap/1.0";
export const NOMINATIM_SEARCH_LIMIT = 1;
export const NOMINATIM_REVERSE_ZOOM = 10;

export const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";
export const OVERPASS_TIMEOUT = 25;
export const OVERPASS_CONTENT_TYPE = "text/plain;charset=UTF-8";

// Geolocation
export const GEOLOCATION_TIMEOUT = 10000;
export const GEOLOCATION_MAXIMUM_AGE = 0;
export const GEOLOCATION_ENABLE_HIGH_ACCURACY = true;

// Distance Calculation
export const METERS_PER_MILE = 1609.34;
export const EARTH_RADIUS_IN_MILES = 3959;

// Pagination
export const RESULTS_PER_PAGE = 10;

// Search Radius
export const SEARCH_RADIUS_OPTIONS = [1, 3, 5, 10, 15, 25];

// Default Values
export const DEFAULT_SEARCH_RADIUS = 5;

// Backend API
export const API_BASE_URL = "http://localhost:3001/api";
