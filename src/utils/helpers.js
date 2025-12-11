import { METERS_PER_MILE, EARTH_RADIUS_IN_MILES } from "../config/constants.js";

export function milesToMeters(miles) {
  return miles * METERS_PER_MILE;
}

export function calculateDistance(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  const earthRadiusInMiles = EARTH_RADIUS_IN_MILES;
  const latitudeDifference = ((latitude2 - latitude1) * Math.PI) / 180;
  const longitudeDifference = ((longitude2 - longitude1) * Math.PI) / 180;
  const haversineIntermediateValue =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos((latitude1 * Math.PI) / 180) *
      Math.cos((latitude2 * Math.PI) / 180) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);
  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(haversineIntermediateValue),
      Math.sqrt(1 - haversineIntermediateValue)
    );
  return earthRadiusInMiles * angularDistance;
}

export function buildAddress(tags) {
  const parts = [];
  if (tags["addr:housenumber"] && tags["addr:street"]) {
    parts.push(`${tags["addr:housenumber"]} ${tags["addr:street"]}`);
  } else if (tags["addr:street"]) {
    parts.push(tags["addr:street"]);
  }
  if (tags["addr:city"]) {
    parts.push(tags["addr:city"]);
  } else if (tags["addr:town"]) {
    parts.push(tags["addr:town"]);
  }
  if (tags["addr:state"]) {
    parts.push(tags["addr:state"]);
  }
  if (tags["addr:postcode"]) {
    parts.push(tags["addr:postcode"]);
  }
  return parts.length > 0 ? parts.join(", ") : null;
}

export function buildTags(tags) {
  const relevantTags = [];
  if (tags.cuisine) relevantTags.push(tags.cuisine);
  if (tags.brand) relevantTags.push(tags.brand);
  if (tags["internet_access"] === "yes") relevantTags.push("WiFi");
  if (tags.outdoor_seating === "yes") relevantTags.push("Outdoor Seating");
  return relevantTags;
}
