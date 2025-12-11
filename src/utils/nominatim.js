import {
  NOMINATIM_BASE_URL,
  NOMINATIM_USER_AGENT,
  NOMINATIM_SEARCH_LIMIT,
  NOMINATIM_REVERSE_ZOOM,
} from "../config/constants.js";

const NOMINATIM_HEADERS = {
  "User-Agent": NOMINATIM_USER_AGENT,
};

export function geocodeCity(city) {
  return fetch(
    `${NOMINATIM_BASE_URL}/search?format=json&limit=${NOMINATIM_SEARCH_LIMIT}&q=${encodeURIComponent(
      city
    )}`,
    {
      headers: NOMINATIM_HEADERS,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        throw new Error(`City "${city}" not found`);
      }

      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        displayName: result.display_name,
      };
    })
    .catch((error) => {
      console.error("Geocoding error:", error);
      throw error;
    });
}

export function reverseGeocode(latitude, longitude) {
  return fetch(
    `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=${NOMINATIM_REVERSE_ZOOM}`,
    {
      headers: NOMINATIM_HEADERS,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.address) {
        throw new Error("Unable to determine location name");
      }

      const address = data.address;
      const locationParts = [];
      if (address.city) {
        locationParts.push(address.city);
      } else if (address.town) {
        locationParts.push(address.town);
      } else if (address.village) {
        locationParts.push(address.village);
      }
      if (address.state) {
        locationParts.push(address.state);
      }

      const displayName =
        locationParts.length > 0
          ? locationParts.join(", ")
          : data.display_name || "Your Location";

      return {
        lat: latitude,
        lon: longitude,
        displayName,
      };
    })
    .catch((error) => {
      console.error("Reverse geocoding error:", error);
      return {
        lat: latitude,
        lon: longitude,
        displayName: "Your Location",
      };
    });
}
