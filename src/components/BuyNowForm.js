import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/joy";
import api from "../api";
import { useNavigate } from "react-router-dom";

const BuyNowForm = ({id}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyNow = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post("/api/create-checkout-session/", {
        property_id: id,
        name,
        email,
      });

    } catch (err) {
      setError("Failed to initiate purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Buy Property Now</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleBuyNow}>
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
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </Box>
    </Container>
  );
};

export default BuyNowForm;
