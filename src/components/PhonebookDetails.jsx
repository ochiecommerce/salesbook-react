import React from "react";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

const PhonebookDetails = ({ phonebook, onShowContacts }) => {
  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {phonebook.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Owned by: {phonebook.owner}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {phonebook.contactCount} contacts
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={() => onShowContacts(phonebook)}
      >
        Show Contacts
      </Button>
    </Box>
  );
};

export default PhonebookDetails;
