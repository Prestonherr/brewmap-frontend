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
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.error?.message || "Request failed");
      });
    }
    return response.json();
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
  return makeRequest(`/coffee-shops/${coffeeShopId}`, {
    method: "DELETE",
  });
};

