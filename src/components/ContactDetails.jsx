import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
} from "@mui/material";
import { getContact } from "../api";

const ContactDetails = () => {
    const { contactId, phonebookId } = useParams();
    const [contact,setContact]=useState({})

    useEffect(()=>{
        getContact(phonebookId,contactId).then(res=>{
            console.log(res.data)
            setContact(res.data)
        })
    },[])
    
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
            </CardContent>
        </Card>
    );
};

export default ContactDetails;
