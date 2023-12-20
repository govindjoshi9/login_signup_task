import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import "../index.css";

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      ).then(res => {
        navigate('/login')
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      history.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#00B6B5",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1C2C4E",
          width: "70%",
          borderRadius: "2px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#01F4E1", marginBottom: 5, textAlign: "center" }}
        >
          REGISTER
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ background: "#4C5874" }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ background: "#4C5874" }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              placeholder: "Select Date of Birth",
            }}
          />
          <TextField
            placeholder="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ background: "#4C5874" }}
            // InputProps={{
            //   startAdornment: (
            //     <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
            //       <AccountCircleIcon sx={{ color: "#01F4E1" }} />
            //     </Avatar>
            //   ),
            // }}
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
            // InputProps={{
            //   startAdornment: (
            //     <Avatar sx={{ bgcolor: "#4C5874", marginRight: 1 }}>
            //       <LockIcon sx={{ color: "#01F4E1" }} />
            //     </Avatar>
            //   ),
            // }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, bgcolor: "#01F4E1" }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2, color: "#87CEEB" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#87CEEB", textDecoration: "underline" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
