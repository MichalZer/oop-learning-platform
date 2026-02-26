import express from "express";
import Progress from "../models/progress.js";
import Topic from "../models/Topic.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get progress for a specific user
router.get("/progress", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await Progress.find({ userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// endpoint returning percentage of completed topics across entire course
router.get("/progress/summary", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const totalTopics = await Topic.countDocuments();
    const completedTopics = await Progress.countDocuments({
      userId,
      status: "completed",
    });
    const progress =
      totalTopics === 0
        ? 0
        : Math.round((completedTopics / totalTopics) * 100);
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;