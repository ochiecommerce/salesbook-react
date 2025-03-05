import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const InquiryForm = ({id}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await axios.post("/api/inquiries/", {
        property: id,
        name,
        email,
        message,
      });
      navigate("/thank-you");
    } catch (err) {
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Inquire About Property</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField 
          fullWidth 
          label="Your Name" 
          margin="normal" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <TextField 
          fullWidth 
          label="Your Email" 
          type="email" 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <TextField 
          fullWidth 
          label="Your Message" 
          multiline 
          rows={4} 
          margin="normal" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </Button>
      </Box>
    </Container>
  );
};

export default InquiryForm;
