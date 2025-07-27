import { apiClient } from "./auth";

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

export const test = _=>{
  getPhonebooks().then(res=>{
    console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
}