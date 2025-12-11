import {
  milesToMeters,
  calculateDistance,
  buildAddress,
  buildTags,
} from "./helpers.js";
import {
  OVERPASS_API_URL,
  OVERPASS_TIMEOUT,
  OVERPASS_CONTENT_TYPE,
} from "../config/constants.js";

export function findCoffeeShops(latitude, longitude, radiusMiles) {
  const radiusMeters = milesToMeters(radiusMiles);

  const query = `
[out:json][timeout:${OVERPASS_TIMEOUT}];
(
  node
    (around:${radiusMeters},${latitude},${longitude})
    [shop=coffee];
  node
    (around:${radiusMeters},${latitude},${longitude})
    [amenity=cafe];
  node
    (around:${radiusMeters},${latitude},${longitude})
    [amenity=coffee_shop];
  way
    (around:${radiusMeters},${latitude},${longitude})
    [shop=coffee];
  way
    (around:${radiusMeters},${latitude},${longitude})
    [amenity=cafe];
  way
    (around:${radiusMeters},${latitude},${longitude})
    [amenity=coffee_shop];
);
out center;
`;

  return fetch(OVERPASS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": OVERPASS_CONTENT_TYPE,
    },
    body: query,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Overpass API failed: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.elements || data.elements.length === 0) {
        return [];
      }

      const coffeeShops = data.elements
        .map((element) => {
          const tags = element.tags || {};
          const centerLat =
            element.lat || (element.center && element.center.lat);
          const centerLon =
            element.lon || (element.center && element.center.lon);

          if (!centerLat || !centerLon) {
            return null;
          }

          const distance = calculateDistance(
            latitude,
            longitude,
            centerLat,
            centerLon
          );

          return {
            id: element.id,
            name: tags.name || "Unnamed Coffee Shop",
            address: buildAddress(tags),
            lat: centerLat,
            lon: centerLon,
            distance: distance,
            tags: buildTags(tags),
          };
        })
        .filter((shop) => shop !== null)
        .sort((a, b) => a.distance - b.distance);

      return coffeeShops;
    })
    .catch((error) => {
      console.error("Coffee shop search error:", error);
      throw error;
    });
}
