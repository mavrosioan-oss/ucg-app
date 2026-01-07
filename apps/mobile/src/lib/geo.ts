import type { LatLng } from "../state/LocationContext";

function toRad(x: number) {
  return (x * Math.PI) / 180;
}

// Returns meters
export function distanceMeters(a: LatLng, b: LatLng): number {
  const R = 6371000; // Earth radius (m)
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);

  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
