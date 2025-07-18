import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Divider, IconButton, Fab, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Phone } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getContacts } from "../api";
import { useState } from "react";
import Loading from "./Loading";
import AddIcon from "@mui/icons-material/Add";
import ContactForm from "./ContactForm";

const NewContact = ({ open }) => {
  return (<Dialog open={open}>
    <DialogTitle>New Contact</DialogTitle>
    <DialogContent>
      <ContactForm />
    </DialogContent>
  </Dialog>)
}
const ContactList = ({ contacts }) => {
  const { phonebookId } = useParams()
  const [creating, setCreating] = useState(contacts.length === 0)
  const navigate = useNavigate()
  
  if (!contacts) return (<Loading text={'contacts'} />)

  return (
    <> 
    <NewContact open={creating}/>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {contacts.length === 0 && (<Typography variant="body1">No contacts found in this phonebook.</Typography>)}
      {contacts.map((contact) => (
        <div key={contact.primary.pk} onClick={() => navigate(`/phonebooks/${phonebookId}/contacts/${contact.primary.pk}`)}>
          <ListItem
            alignItems="flex-start"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
              borderRadius: "8px",
              mb: 1
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
              <a href={"tel:" + contact.primary.phone}> <Phone /></a>

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
    </List></>

  );
};

const ContactsPage = () => {
  const { phonebookId } = useParams()
  const [contacts, setContacts] = useState()
  useEffect(() => {
    getContacts(phonebookId).then((res) => {
      setContacts(res.data?.data)
    }).catch((err) => console.log(err))
  }, [phonebookId])

  if (!contacts) return (<Loading text={'contacts'} />)
  return (<ContactList contacts={contacts} />)
}

export default ContactsPage;
