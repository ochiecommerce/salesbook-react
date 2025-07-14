import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { createPhonebook } from "../api";
const PhonebookForm = () => {
  const [name, setName] = useState("");
  const [shared, setShared] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      createPhonebook({ name, shared })
        .then((newPhonebook) => {
            // navigate to the new phonebook details page
            console.log("Phonebook created:", newPhonebook);

        })
        .catch((error) => {
          console.error("Error creating phonebook:", error);
        });
      setName(""); // Reset the form
      setShared(false); // Reset the shared checkbox
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
      <FormControlLabel
        control={<Checkbox checked={shared} onChange={(e) => setShared(e.target.checked)} />}
        label="Shared"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Create Phonebook
      </Button>
    </Box>
  );
};

export default PhonebookForm;
