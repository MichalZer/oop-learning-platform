import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//Simple check to see if the server is alive
router.get("/health", (req, res) => {
  res.status(200).json({ message: "the route is healthy" });
});

//Handles new user creation: checks existence, hashes password, and saves to DB.

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: passwordHash,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(500).json({ message: err.message });
  }
});

// post route for user login: verifies credentials and returns a JWT token if successful
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //compere the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }  
    // Generate a JWT token with the user's ID and role, and set an expiration time
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    //return the token and basic user info to the clinet
    res.json({token,user: {id: user._id, name: user.name, email: user.email, role: user.role}});
}catch (err) {
    res.status(500).json({message: err.message});
}
});

// router for the current user: uses the auth middleware to protect the route and returns the user's information
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude the password field
    res.json(user);
  }catch(err){
    res.status(500).json({message:err.message});
  }
}
);

router.post("/reset-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const sameAsOld = await bcrypt.compare(newPassword, user.password);
    if (sameAsOld) {
      return res.status(400).json({
        message: "New password must be different from the current password",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;