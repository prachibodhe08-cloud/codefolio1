const User = require("../models/user");

const signupUser = async (req, res) => {
  try {
    console.log(req.body);

    const user = new User(req.body);
    await user.save();

    res.status(200).json({
      message: "Signup successful"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      message: "User not found"
    });
  }

  if (user.password !== password) {
    return res.json({
      message: "Wrong password"
    });
  }

  res.json({
    message: "Login successful"
  });
};

module.exports = { signupUser, loginUser };