import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../api";
import { useNavigate,} from "react-router-dom";

const BookingForm = ({id}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await api.post("/bookings/", {
        property: id,
        name,
        email,
        date,
      });
      navigate("/booking-confirmation");
    } catch (err) {
      setError("Failed to book property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Book This Property</Typography>
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
          label="Booking Date" 
          type="date" 
          margin="normal" 
          InputLabelProps={{ shrink: true }}
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </Box>
    </Container>
  );
};

export default BookingForm;
