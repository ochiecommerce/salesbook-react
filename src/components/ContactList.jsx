import React from "react";
import { List, ListItem, ListItemText, Typography, Divider, IconButton } from "@mui/material";
import { Phone } from "@mui/icons-material";

const ContactList = ({ contacts }) => {
  if (contacts.length === 0) {
    return <Typography variant="body1">No contacts found in this phonebook.</Typography>;
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <ListItem
            alignItems="flex-start"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
              borderRadius: "8px",
              mb: 1
            }}
          >
            <ListItemText
              primary={contact.name}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {contact.phone}
                  </Typography>
                </>
              }
            />
            <IconButton edge="end" aria-label="call">
              <Phone />
            </IconButton>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default ContactList;
