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
    const { name, email, password } = req.body;
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hash the password before saving
    const passwordHash = await bcrypt.hash(password, 10);

    //create and save a new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: passwordHash,
    });
    res.json({ message: "User created successfully" });
  } catch (err) {
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
export default router;