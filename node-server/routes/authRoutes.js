const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = "asfe34etet3456";

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      dob,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, "secret", {
      expiresIn: "1h",
    });

    // Send token and user information in the response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        dob: user.dob,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
