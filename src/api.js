// src/api.js
import axios from "axios";

const API_BASE = "http://localhost/api"; // replace with actual URL

// Phonebooks
export const getPhonebooks = () => axios.get(`${API_BASE}/phonebooks`);
export const getPhonebook = (id) => axios.get(`${API_BASE}/phonebooks/${id}`);
export const createPhonebook = (data) => axios.post(`${API_BASE}/phonebooks`, data);
export const updatePhonebook = (id, data) => axios.put(`${API_BASE}/phonebooks/${id}`, data);

// Contacts
export const getContacts = (phonebookId) =>
  axios.get(`${API_BASE}/phonebooks/${phonebookId}/contacts`);
export const getContact = (phonebookId, contactId) =>
  axios.get(`${API_BASE}/phonebooks/${phonebookId}/contacts/${contactId}`);
export const createContact = (phonebookId, data) =>
  axios.post(`${API_BASE}/phonebooks/${phonebookId}/contacts`, data);
export const updateContact = (phonebookId, contactId, data) =>
  axios.put(`${API_BASE}/phonebooks/${phonebookId}/contacts/${contactId}`, data);
