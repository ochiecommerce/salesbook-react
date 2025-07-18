// PhonebookContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getPhonebooks, getContact, createContact,createPhonebook } from "../api";
const PhonebookContext = createContext();

export const usePhonebook = () => useContext(PhonebookContext);

export const PhonebookProvider = ({ children }) => {
  const [phonebooks, setPhonebooks] = useState([]);

  // Load from localStorage
  useEffect(() => {
      // Fetch from API if not found in localStorage
      getPhonebooks().then((res) => setPhonebooks(res.data));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("phonebooks", JSON.stringify(phonebooks));
  }, [phonebooks]);

  const createPhonebook = (pb) => {
    setPhonebooks((prev) => [...prev, { ...pb, id: Date.now() }]);
    // Optionally, you can also call the API to persist the new phonebook
    createPhonebook(pb).then((res) => {
      // Handle response if needed
    });
  };

  const updatePhonebook = (id, updates) => {
    setPhonebooks((prev) =>
      prev.map((pb) => (pb.id === id ? { ...pb, ...updates } : pb))
    );
  };

  const addContact = (phonebookId, contact) => {
    setPhonebooks((prev) =>
      prev.map((pb) =>
        pb.id === phonebookId
          ? { ...pb, contacts: [...pb.contacts, { ...contact, id: Date.now() }] }
          : pb
      )
    );
  };

  const updateContact = (phonebookId, contactId, updates) => {
    setPhonebooks((prev) =>
      prev.map((pb) =>
        pb.id === phonebookId
          ? {
              ...pb,
              contacts: pb.contacts.map((c) =>
                c.id === contactId ? { ...c, ...updates } : c
              ),
            }
          : pb
      )
    );
  };

  const getPhonebook = (id) => phonebooks.find((pb) => pb.id === Number(id));
  const getContact = (phonebookId, contactId) =>
    getPhonebook(phonebookId)?.contacts.find((c) => c.id === Number(contactId));

  return (
    <PhonebookContext.Provider
      value={{
        phonebooks,
        createPhonebook,
        updatePhonebook,
        addContact,
        updateContact,
        getPhonebook,
        getContact,
      }}
    >
      {children}
    </PhonebookContext.Provider>
  );
};
