// src/api/auth.js
import axios from "axios";

const BASE = "http://localhost/api/auth"; // adjust to match your backend

export const login = async (credentials) => {
  const response = await axios.post(`${BASE}/login/`, credentials);
  return response.data; // contains token or access/refresh
};

export const logout = async () => {
  return axios.post(`${BASE}/logout/`);
};

export const getUser = async (token) => {
  return axios.get(`${BASE}/user/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
