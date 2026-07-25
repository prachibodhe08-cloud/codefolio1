const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const contactRoutes = require("./routes/contactRouter");
const signupRoutes = require("./routes/signupRouter");
const profileRoutes = require("./routes/profileRouter");

console.log("User routes loaded");
console.log("Profile routes loaded");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", contactRoutes);
app.use("/", signupRoutes);
app.use("/profile", profileRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});