// src/api/auth.js
import axios from "axios";
import { getCsrfToken } from "../api"; // Adjust the import path as necessary
const BASE = "/api/auth"; // adjust to match your backend

export const login = async (credentials) => {
  const response = await axios.post(`${BASE}/login/`, credentials, {
    headers: {
      "X-CSRFToken": getCsrfToken(), // Include CSRF token if needed
    },
  });
  return response.data; // contains token or access/refresh
};

export const logout = async () => {
  return axios.post(`${BASE}/logout/`, {
    headers: {
      "X-CSRFToken": getCsrfToken(), // Include CSRF token if needed
    },
  });
};

export const getUser = async (token) => {
  return axios.get(`${BASE}/user/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
