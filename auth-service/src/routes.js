import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./userModel.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
