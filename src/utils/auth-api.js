import { API_BASE_URL } from "../config/constants";

// Register a new user
export const register = (email, name, password) => {
  return fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error?.message || "Registration failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    });
};

// Login user
export const login = (email, password) => {
  return fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error?.message || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    });
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Update user profile
export const updateUserProfile = (name, email, password) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error("Not authenticated"));
  }

  const body = {};
  if (name) body.name = name;
  if (email) body.email = email;
  if (password) body.password = password;

  return fetch(`${API_BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error?.message || "Update failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      // Update user in localStorage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    });
};
