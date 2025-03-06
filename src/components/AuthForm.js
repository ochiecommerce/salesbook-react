import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import api from "../api";

const AuthForm = ({ setAuth, isLogin = true }) => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!isLogin){if(password1.length<8){
      setError('Password must be at least 8 characters')
      return
    }
    if(password1!=password2){
      setError('Your passwords does not match')
      return
    }}
    setLoading(true);
    setError(null);

    try {
      const payload = isLogin ? { username:name, password:password1 } : {username:name, password1,password2 };

      if (isLogin) {
        login(payload)
        navigate("/");
      } else {
        await api.post(`/auth/register/`, payload);
        navigate("/auth/login");
      }
    } catch (err) {
      setError(isLogin ? "Invalid email or password" : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>{isLogin ? "Login" : "Register"}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        {/* <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        {!isLogin && (
          <TextField
            fullWidth
            label="Repeat Password"
            type="password"
            margin="normal"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthForm;
