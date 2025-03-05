import React from "react";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ThankYou = (submittable) => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Thank You!</Typography>
      <Typography variant="body1">
        Your {submittable} has been submitted successfully. We will get back to you soon.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>Back to Home</Typography>
      </Link>
    </Container>
  ); 
}
export default ThankYou;

