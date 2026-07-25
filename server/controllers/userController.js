const User = require("../models/User");

const signupUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({ message: "Login successful" });

  } catch (error) {
  console.log(error);
  res.status(500).json({ message: error.message });
}
};

module.exports = { signupUser,loginUser };