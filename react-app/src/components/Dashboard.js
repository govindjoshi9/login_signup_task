// Dashboard.js
import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  // Fetch user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard, {userData.name}!
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.dob}</TableCell>
              <TableCell>{userData.email}</TableCell>
            </TableRow>
            {/* Add more rows if needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
