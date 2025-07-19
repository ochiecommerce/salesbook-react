// components/RegisterPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { checkUsername } from "../api";
import { useAuth } from "../context/AuthContext";

export const UsernameInput = ({ username,setUsername}) => {
  const [usernameError, setUsernameError] = useState("");
  const debounceTimeout = useRef(null);
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError("");

    // Debounce the API call (wait 300ms after typing)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.length >= 3) {
        checkUsername(value)
          .then((response) => {
            if (!response.data.valid) {
              setUsernameError(
                response.data.error || "Username is not available"
              );
            }
          })
          .catch(() => {
            setUsernameError("Could not validate username");
          });
      }
    }, 300);
  };
  return (
    <TextField
      label="Username"
      fullWidth
      required
      margin="normal"
      value={username}
      onChange={handleUsernameChange}
      error={!!usernameError}
      helperText={
        usernameError || "Must be unique (letters, numbers, underscores)."
      }
    />
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {setToken } = useAuth()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError("");

    if (password1 !== password2) {
      setLoading(false);
      setGlobalError("Passwords do not match");
      return;
    }

    axios
      .post("/api/auth/registration/", {
        email,
        username,
        password1,
        password2,
      })
      .then((response) => {
        const token = response.data.key;
        localStorage.setItem("token", token);
        setToken(token)
        navigate("/");
      })
      .catch((err) => {
        const errors = err.response?.data?.non_field_errors?.[0];
        const usernameErrors = err.response?.data?.username?.join(", ");
        setGlobalError(
          errors || usernameErrors || "Registration failed. Please try again."
        );
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Create account
        </Typography>

        {globalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {globalError}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <UsernameInput username={username} setUsername={setUsername} />

          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            fullWidth
            required
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Registering..." : "Create account"}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
