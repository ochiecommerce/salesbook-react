import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages / Components
import PhonebookList from "./components/PhonebookList";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookDetails from "./components/PhonebookDetails";

import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";

import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PhonebookList />
              </PrivateRoute>
            }
          />
          
          <Route path="/phonebooks/new" element={<PrivateRoute><PhonebookForm /></PrivateRoute>} />
          <Route path="/phonebooks/:phonebookId" element={<PrivateRoute><PhonebookDetails /></PrivateRoute>} />

          {/* Contact Routes */}
          <Route path="/phonebooks/:phonebookId/contacts" element={<PrivateRoute><ContactList/></PrivateRoute>} />
          <Route path="/phonebooks/:phonebookId/contacts/new" element={<PrivateRoute><ContactForm /></PrivateRoute>} />
          <Route
            path="/phonebooks/:phonebookId/contacts/:contactId"
            element={<PrivateRoute><ContactDetails /></PrivateRoute>}
          />
          <Route
            path="/phonebooks/:phonebookId/contacts/:contactId/edit"
            element={<PrivateRoute><ContactForm /></PrivateRoute>}
          />
        </Routes>
    </AuthProvider>)
}

export default App;
