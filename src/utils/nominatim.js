const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const NOMINATIM_HEADERS = {
  "User-Agent": "BrewMap/1.0",
};

export async function geocodeCity(city) {
  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?format=json&limit=1&q=${encodeURIComponent(
        city
      )}`,
      {
        headers: NOMINATIM_HEADERS,
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const result = data[0];
    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
      {
        headers: NOMINATIM_HEADERS,
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data = await response.json();

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
      lat,
      lon,
      displayName,
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return {
      lat,
      lon,
      displayName: "Your Location",
    };
  }
}
