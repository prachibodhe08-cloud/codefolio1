const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

router.get("/", (req, res) => {
  res.send("Profile route working");
});

router.post("/", async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log(req.body.college);

    const profile = new Profile(req.body);
    

    const savedProfile = await profile.save();

    console.log("Saved:", savedProfile);

    res.json({
      message: "Profile saved successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;