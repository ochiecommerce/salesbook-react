import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";
import { createNote, getContact } from "../api";
import { Username } from "./User";

const NewNote = ({ open, onDone, contact }) => {
  const [note, setNote] = useState("");
  const onSubmit = () => {
    createNote({ note, contact }).then((res) => {
      onDone();
    });
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Create a note</DialogTitle>
      <DialogContent>
        <TextField
          label="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

const ContactDetails = () => {
  const { contactId, phonebookId } = useParams();
  const [contact, setContact] = useState({});
  const [isAddingNote, setIsAddingNote] = useState();

  useEffect(() => {
    getContact(phonebookId, contactId).then((res) => {
      setContact(res.data);
    });
  }, []);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {contact.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          📞 {contact.phone}
        </Typography>

        {contact.email && (
          <Typography variant="body1" gutterBottom>
            📧 {contact.email}
          </Typography>
        )}

        {contact.address && (
          <Typography variant="body1" gutterBottom>
            🏠 {contact.address}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Notes
          </Typography>
          <NewNote
            contact={contactId}
            open={isAddingNote}
            onDone={() => setIsAddingNote(false)}
          />
          <Button onClick={() => setIsAddingNote(true)}>Add a note</Button>

          {contact.notes && contact.notes.length > 0 ? (
            contact.notes.map((note, idx) => (
              <Stack key={idx} direction={"row"}>
                <Typography paddingLeft={1} margin={1} borderRadius={5} bgcolor={'yellow'}>{note.timestamp}</Typography>
                <Typography paddingRight={1} margin={1} >
                  {note.note}
                </Typography>
                <Username id={note.user} />
              </Stack>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No notes added.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
