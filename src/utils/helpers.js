export function milesToMeters(miles) {
  return miles * 1609.34;
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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
