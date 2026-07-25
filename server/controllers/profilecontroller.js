const Profile = require("../models/Profile");

const saveProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);

    await profile.save();

    res.json({
      message: "Profile saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  saveProfile
};