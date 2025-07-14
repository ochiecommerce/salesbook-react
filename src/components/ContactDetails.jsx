import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Divider,
    Box,
} from "@mui/material";

import { usePhonebook } from "../context/PhonebookContext";
const ContactDetails = ({ contact, onEdit, onAddNote }) => {
    const { contactId, phonebookId } = useParams();
    const { getContact } = usePhonebook();

    if (!contact){
        contact = getContact(phonebookId, contactId);
    }
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
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Notes
                    </Typography>
                    {contact.notes && contact.notes.length > 0 ? (
                        contact.notes.map((note, idx) => (
                            <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                                - {note}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No notes added.
                        </Typography>
                    )}
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={() => onEdit(contact)}>
                        Edit Contact
                    </Button>
                    <Button variant="contained" onClick={() => onAddNote(contact)}>
                        Add Note
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ContactDetails;
