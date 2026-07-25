const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  github: String,
  linkedin: String,
  college: String,
  course: String,
  year: String,
  cgpa: String
});

module.exports = mongoose.model("Profile", profileSchema);