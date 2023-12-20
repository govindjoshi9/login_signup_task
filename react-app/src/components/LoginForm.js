
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import '../index.css'
const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      // Save user data to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to /dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#00B6B5", // Light Blue Background
        minHeight: "100vh",
        justifyContent: "center", // Center the login box vertically
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1C2C4E", // Dark Blue Box
          width: "70%", // Full width on larger screens
          borderRadius: "2px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#01F4E1", marginBottom: 5, textAlign: "center" }}
        >
          SIGN IN
        </Typography>
        <Avatar
          sx={{
            bgcolor: "#4C5874",
            marginBottom: 2,
            width: 100, // Adjust the width as needed
            height: 100, // Adjust the height as needed
          }}
        >
          <AccountCircleIcon sx={{ color: "#1C2C4E", width: 80, height: 80 }} />
        </Avatar>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            placeholder="username"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ background: "#4C5874" }}
            InputProps={{
              startAdornment: (
                <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
                  <AccountCircleIcon sx={{ color: "#001F3F" }} />
                </Avatar>
              ),
            }}
          />
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ background: "#4C5874" }}
            InputProps={{
              startAdornment: (
                <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
                  <LockIcon sx={{ color: "#001F3F" }} />
                </Avatar>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, bgcolor: "#01F4E1" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2, color: "#87CEEB" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#87CEEB", textDecoration: "underline" }}
          >
            Register
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, color: "#87CEEB" }}>
          <Link
            to="/forgot-password"
            style={{ color: "#87CEEB", textDecoration: "underline" }}
          >
            Forgot Password?
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
