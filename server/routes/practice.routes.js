import express from "express";
import auth from "../middlewares/auth.js";
import Practice from "../models/Practice.js";
const router = express.Router();

// Save a practice session for the authenticated user
router.post("/practice/save", auth, async (req, res) => {
  const { language, features, generatedCode } = req.body;
  if (!language || !features || !generatedCode) {
    return res.status(400).json({ message: "Missing practice data" });
  }

  const practice = await Practice.create({
    userId: req.user.userId,
    language,
    features,
    generatedCode,
  });

  res.json(practice);
});

router.get("/practice/mine", auth, async (req, res) => {
  const practices = await Practice.find({
    userId: req.user.userId,
  }).sort({ createdAt: -1 });

  res.json(practices);
});

export default router;