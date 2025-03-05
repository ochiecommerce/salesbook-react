import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Rating } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RatingFeedbackForm = ({id}) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await axios.post("http://localhost:8000/api/ratings/", {
        property: id,
        rating,
        feedback,
        name,
        email,
      });
      navigate("/thank-you");
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Rate & Review Property</Typography>
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
        <Typography variant="h6">Your Rating</Typography>
        <Rating 
          value={rating} 
          onChange={(event, newValue) => setRating(newValue)}
          precision={0.5}
        />
        <TextField 
          fullWidth 
          label="Your Feedback" 
          multiline 
          rows={4} 
          margin="normal" 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </Box>
    </Container>
  );
};

export default RatingFeedbackForm;
// Compare this snippet from ThankYou.js:
