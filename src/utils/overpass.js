import {
  milesToMeters,
  calculateDistance,
  buildAddress,
  buildTags,
} from "./helpers.js";

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export async function findCoffeeShops(lat, lon, radiusMiles) {
  const radiusMeters = milesToMeters(radiusMiles);

  const query = `
[out:json][timeout:25];
(
  node
    (around:${radiusMeters},${lat},${lon})
    [shop=coffee];
  node
    (around:${radiusMeters},${lat},${lon})
    [amenity=cafe];
  node
    (around:${radiusMeters},${lat},${lon})
    [amenity=coffee_shop];
  way
    (around:${radiusMeters},${lat},${lon})
    [shop=coffee];
  way
    (around:${radiusMeters},${lat},${lon})
    [amenity=cafe];
  way
    (around:${radiusMeters},${lat},${lon})
    [amenity=coffee_shop];
);
out center;
`;

  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`Overpass API failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return [];
    }

    const coffeeShops = data.elements
      .map((element) => {
        const tags = element.tags || {};
        const centerLat = element.lat || (element.center && element.center.lat);
        const centerLon = element.lon || (element.center && element.center.lon);

        if (!centerLat || !centerLon) {
          return null;
        }

        const distance = calculateDistance(lat, lon, centerLat, centerLon);

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
  } catch (error) {
    console.error("Coffee shop search error:", error);
    throw error;
  }
}
