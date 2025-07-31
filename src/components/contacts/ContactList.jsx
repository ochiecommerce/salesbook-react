import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { Phone } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ContactForm from "./ContactForm";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

const NewContact = ({ open, onDone, onCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>New Contact</DialogTitle>
      <DialogContent>
        <ContactForm onSubmit={onDone} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export const ContactsDatagrid = ({ contacts, columns }) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={contacts}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
      />
    </Box>
  );
};

const ContactList = ({ contacts }) => {
  const { phonebookId } = useParams();

  const [creating, setCreating] = useState(contacts.length === 0);
  const navigate = useNavigate();

  return (
    <>
      <NewContact
        open={creating}
        onDone={(_) => setCreating(false)}
        onCancel={(_) => setCreating(false)}
      />

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {contacts.length === 0 && (
          <Typography variant="body1">
            No contacts found in this phonebook.
          </Typography>
        )}
        {contacts.map((contact) => (
          <div
            key={contact.primary.pk}
            onClick={() =>
              navigate(
                `/phonebooks/${phonebookId}/contacts/${contact.primary.pk}`
              )
            }
          >
            <ListItem
              alignItems="flex-start"
              sx={{
                "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
                borderRadius: "8px",
                mb: 1,
              }}
            >
              <ListItemText
                primary={contact.primary.name}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {contact.primary.phone}
                    </Typography>
                  </>
                }
              />
              <IconButton edge="end" aria-label="call">
                <a href={"tel:" + contact.primary.phone}>
                  {" "}
                  <Phone />
                </a>
              </IconButton>
            </ListItem>
            <Divider />
          </div>
        ))}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setCreating(true)}
          sx={{ position: "fixed", bottom: 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
      </List>
    </>
  );
};

export default ContactList;
