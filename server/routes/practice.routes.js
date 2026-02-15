import express from "express";
import auth from "../middlewares/auth.js";
import Practice from "../models/Practice.js";
const router = express.Router();

// Save a practice session for the authenticated user
router.post("/practice/save", auth, async (req, res) => {
    const practice = await Practice.create({
    userId: req.user.userId,
    language: req.body.language,
    features: req.body.features,
    generatedCode: req.body.generatedCode,
  });

  res.json(practice);
});

export default router;