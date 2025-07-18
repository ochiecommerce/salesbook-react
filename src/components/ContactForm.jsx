import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { createContact } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = ({ onSubmit, contact = null, onCancel }) => {
  const navigate = useNavigate()
  const {phonebookId} = useParams()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        address: contact.address || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...contact,
      ...formData,
    };
    console.log(newContact)
    createContact(phonebookId,newContact).then((res)=>{
      console.log(res.data)
      navigate(`/phonebooks/${phonebookId}/contacts`)
    })
    setFormData({ name: "", phone: "", email: "", address: "" });
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {contact ? "Edit Contact" : "New Contact"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              {contact ? "Update" : "Create"}
            </Button>
            {onCancel && (
              <Button variant="text" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
