import {
  GEOLOCATION_TIMEOUT,
  GEOLOCATION_MAXIMUM_AGE,
  GEOLOCATION_ENABLE_HIGH_ACCURACY,
} from "../config/constants.js";

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: GEOLOCATION_ENABLE_HIGH_ACCURACY,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: GEOLOCATION_MAXIMUM_AGE,
      }
    );
  });
}
