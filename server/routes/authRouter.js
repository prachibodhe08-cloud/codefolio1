const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.json({
      message: "User already exists",
    });
  }

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  res.json({
    message: "Signup successful",
  });
});

// Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.json({
      message: "Wrong password",
    });
  }

  res.json({
    message: "Login successful",
  });
});

module.exports = router;