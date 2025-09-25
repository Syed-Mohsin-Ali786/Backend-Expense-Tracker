import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js"; // add `.js` if using ES modules
import jwt from "jsonwebtoken";
import "@dotenvx/dotenvx";

const router = express.Router();

// REGISTER (SignUp)
router.post("/signUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      message: "User Created Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect Password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

export default router;
