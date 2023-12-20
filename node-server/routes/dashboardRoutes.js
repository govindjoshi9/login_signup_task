const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = "asfe34etet3456";



// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ message: "Forbidden", error: err.message });
    }

    req.user = user;
    next();
  });
}



// Dashboard route to get all users
router.get("/", authenticateToken, async (req, res) => {
    try {
      // Retrieve user data from MongoDB based on the authenticated user's ID
      const user = await User.findById(req.user.id);

      // Return user data
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        // Include other fields as needed
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }

});

module.exports = router;
