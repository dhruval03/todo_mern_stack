const router = require("express").Router({ timeout: 120000 });
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { emailID, userName, password } = req.body;
        const existingUser = await User.findOne({ emailID });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        const hashPassword = bcrypt.hashSync(password);
        const user = new User({ emailID, userName, password: hashPassword });
        await user.save();
        res.status(200).json({ message: "Sign Up Successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { emailID, password } = req.body;
        const user = await User.findOne({ emailID });
        if (!user) {
            return res.status(200).json({ message: "User not found. Please sign up first." });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {         
            return res.status(200).json({ message: "Incorrect password" });
        }
        const { _id } = user;
        res.status(200).json({ message: "Login successful", _id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});

module.exports = router;