// src/api.js
import axios from "axios";

export const checkUsername = (username) => {
  return axios.get(`/api/user/check/?username=${username}`);
};
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const getCsrfToken = () => {
  const csrfToken = getCookie("csrftoken");
  if (!csrfToken) {
    console.error("CSRF token not found");
  }
  return csrfToken;
};

const apiClient = axios.create({
  baseURL: "/api", // Adjust the base URL as needed
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`, // or however you manage auth tokens
    "X-CSRFToken": getCookie("csrftoken"),
  },
});

export const searchUsers = (query) => {
  return apiClient.get(`/user/search/?q=${query}`);
};

export const registerUser = (data) => {
  return apiClient.post(`/auth/registration/`, data);
};

// Phonebooks
export const getPhonebooks = () => apiClient.get(`/phonebooks`);
export const getPhonebook = (id) => apiClient.get(`/phonebooks/${id}`);
export const createPhonebook = (data) => {
  return apiClient.post(`/phonebooks/`, data);
};

export const updatePhonebook = (id, data) =>
  apiClient.put(`/phonebooks/${id}`, data);

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
