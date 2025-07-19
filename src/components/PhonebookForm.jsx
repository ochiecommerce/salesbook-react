import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Alert } from "@mui/material";
import { createPhonebook } from "../api";
const PhonebookForm = () => {
  const [name, setName] = useState("");
  const [description,setDescription]=useState("")
  const [error,setError]=useState(null)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      createPhonebook({ name, description })
        .then((res) => {
            // navigate to the new phonebook details page
            console.log(res)
            let newPhonebook = res?.data
            console.log("Phonebook created:", newPhonebook);
            navigate(`/phonebooks/${newPhonebook?.pk}/`)
        })
        .catch((error) => {
          setError(error)
        });
      setName(""); // Reset the form
      setDescription("")
    } else {
      setError({ data: { description: "Phonebook name is required." } });
    } 
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Phonebook Name"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error&&<Alert sx={{ mb: 2 }} severity="error">{error.data?.description}</Alert>}
      <TextField
        label="Phonebook Description"
        variant="outlined"
        fullWidth
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Create Phonebook
      </Button>
    </Box>
  );
};

export default PhonebookForm;
