
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on connection failure
  }
}





const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
