import { API_BASE_URL } from "../config/constants";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Make authenticated request
const makeRequest = (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error?.message || "Request failed");
        });
      }
      return response.json();
    })
    .catch((error) => {
      // Handle network errors (connection refused, etc.)
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        throw new Error(
          "Unable to connect to server. Please make sure the backend is running."
        );
      }
      throw error;
    });
};

// Save a coffee shop
export const saveCoffeeShop = (coffeeShopData) => {
  return makeRequest("/coffee-shops", {
    method: "POST",
    body: JSON.stringify(coffeeShopData),
  });
};

// Get all saved coffee shops
export const getSavedCoffeeShops = () => {
  return makeRequest("/coffee-shops");
};

// Delete a saved coffee shop
export const deleteCoffeeShop = (coffeeShopId) => {
  // Ensure ID is a string
  const id = String(coffeeShopId).trim();
  if (!id) {
    return Promise.reject(new Error("Coffee shop ID is required"));
  }
  return makeRequest(`/coffee-shops/${id}`, {
    method: "DELETE",
  });
};
