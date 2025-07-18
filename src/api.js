// src/api.js
import axios from "axios";
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const API_BASE = "http://localhost/api"; // replace with actual URL

// create an axios instance if you need to set common headers or interceptors
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Authorization": `Token ${localStorage.getItem("token")}`, // or however you manage auth tokens
    'X-CSRFToken':getCookie('csrftoken')
  },
});

// Phonebooks
export const getPhonebooks = () => apiClient.get(`${API_BASE}/phonebooks`);
export const getPhonebook = (id) => apiClient.get(`${API_BASE}/phonebooks/${id}`);
export const createPhonebook = (data) => {  
  return apiClient.post(`${API_BASE}/phonebooks/`, data, )
}

export const updatePhonebook = (id, data) => apiClient.put(`${API_BASE}/phonebooks/${id}`, data);

// Contacts
export const getContacts = (phonebookId) =>
  apiClient.get(`${API_BASE}/phonebooks/${phonebookId}/contacts`);
export const getContact = (phonebookId, contactId) =>
  apiClient.get(`${API_BASE}/phonebooks/${phonebookId}/contacts/${contactId}`);
export const createContact = (phonebookId, data) =>
  apiClient.post(`${API_BASE}/phonebooks/${phonebookId}/contacts/`, data);
export const updateContact = (phonebookId, contactId, data) =>
  apiClient.put(`${API_BASE}/phonebooks/${phonebookId}/contacts/${contactId}`, data);

export const addColumn=(data)=>apiClient.post(`${API_BASE}/columns/`,data)

export const getNotes=()=>apiClient.get('/notes')
export const createNote=(data)=>apiClient.post('/notes/',data)