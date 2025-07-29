// src/api.js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

// Helper to update Authorization when token changes
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    apiClient.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete apiClient.defaults.headers["Authorization"];
  }
};

export const checkUsername = (details) => {
  if (details.username)return apiClient.get(`/user/check/?username=${details?.username}`);
  if (details.id)return apiClient.get(`/user/check/?id=${details?.id}`);
  
};

export const register = (details) => {
  return apiClient.post("/auth/registration/", details);
};

export const login = (credentials) => {
  return apiClient.post("/auth/login/", credentials);
};
export const resetPassword = (data)=>apiClient.post('/user/password/reset/',data)

export const resetPasswordConfirm = (data)=>apiClient.post('/user/password/reset/confirm/',data)

export const logout = () => {
  return apiClient.get("/auth/logout/");
};

export const getUser = () => {
  return apiClient.get("/auth/user/");
};

export const searchUsers = (query) => {
  return apiClient.get(`/user/search/?q=${query}`);
};
