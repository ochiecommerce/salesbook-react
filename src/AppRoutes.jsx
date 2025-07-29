import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages / Components
import PhonebookList from "./components/contacts/PhonebookList";
import PhonebookForm from "./components/contacts/PhonebookForm";

import ContactList from "./components/contacts/ContactList";
import ContactForm from "./components/contacts/ContactForm";
import ContactDetails from "./components/contacts/ContactDetails";

import { useAuth } from "./context/AuthContext";
import { RegisterPage } from "./components/RegisterPage";
import LoginDialog from "./components/LoginPage";
import NotesPage from "./components/NotesPage";
import PhonebookPage from "./components/contacts/PhonebookPage";
import OrdersPage from "./components/market/OrdersList";
import ProductsPage from "./components/market/ProductsPage";
import PasswordResetStepper from "./components/PasswordReset";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  return user || authenticated ? (
    children
  ) : (
    <LoginDialog setAuthenticated={setAuthenticated} />
  );
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset_password" element={<PasswordResetStepper/>}/>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PhonebookList />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/phonebooks"
        element={
          <PrivateRoute>
            <PhonebookList />
          </PrivateRoute>
        }
      />

      <Route
        path="/phonebooks/new"
        element={
          <PrivateRoute>
            <PhonebookForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/phonebooks/:phonebookId"
        element={
          <PrivateRoute>
            <PhonebookPage />
          </PrivateRoute>
        }
      />

      {/* Contact Routes */}
      <Route
        path="/phonebooks/:phonebookId/contacts"
        element={
          <PrivateRoute>
            <ContactList />
          </PrivateRoute>
        }
      />
      <Route
        path="/phonebooks/:phonebookId/contacts/new"
        element={
          <PrivateRoute>
            <ContactForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/phonebooks/:phonebookId/contacts/:contactId"
        element={
          <PrivateRoute>
            <ContactDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/phonebooks/:phonebookId/contacts/:contactId/edit"
        element={
          <PrivateRoute>
            <ContactForm />
          </PrivateRoute>
        }
      />
      <Route path="/orders" element={<OrdersPage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
