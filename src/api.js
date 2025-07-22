// src/api.js
import axios from "axios";

const apiClient = axios.create({
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

export const logout = () => {
  return apiClient.get("/auth/logout/");
};

export const getUser = () => {
  return apiClient.get("/auth/user/");
};

export const searchUsers = (query) => {
  return apiClient.get(`/user/search/?q=${query}`);
};


// Phonebooks
export const getPhonebooks = () => apiClient.get(`/phonebooks`);
export const getPhonebook = (id) => apiClient.get(`/phonebooks/${id}`);
export const createPhonebook = (data) => {
  return apiClient.post(`/phonebooks/`, data);
};

export const updatePhonebook = (id, data) =>
  apiClient.put(`/phonebooks/${id}`, data);

export const addReadPermission = (phonebookId, user) =>
  apiClient.post(`/phonebooks/${phonebookId}/read_permissions/`, {user});

// Contacts
export const getContacts = (phonebookId) =>
  apiClient.get(`/phonebooks/${phonebookId}/contacts`);
export const getContact = (phonebookId, contactId) =>
  apiClient.get(`/phonebooks/${phonebookId}/contacts/${contactId}`);
export const createContact = (phonebookId, data) =>
  apiClient.post(`/phonebooks/${phonebookId}/contacts/`, data);
export const updateContact = (phonebookId, contactId, data) =>
  apiClient.put(`/phonebooks/${phonebookId}/contacts/${contactId}`, data);

export const addColumn = (data) => apiClient.post(`/columns/`, data);

export const getNotes = () => apiClient.get("/notes");
export const createNote = (data) => apiClient.post("/notes/", data);
