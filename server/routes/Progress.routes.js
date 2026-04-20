import express from "express";
import Progress from "../models/progress.js";
import Topic from "../models/Topic.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all progress records for the current user
router.get("/progress", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await Progress.find({ userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get overall course progress by completed topics
router.get("/progress/summary", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const topics = await Topic.find().select("_id");
    const validTopicIds = topics.map((t) => String(t._id));
    const totalTopics = validTopicIds.length;

    const completedProgress = await Progress.find({
      userId,
      status: "completed",
    }).select("topicId");

    const uniqueCompletedTopicIds = [
      ...new Set(
        completedProgress
          .map((p) => String(p.topicId))
          .filter((topicId) => validTopicIds.includes(topicId))
      ),
    ];

    const completedTopicsCount = uniqueCompletedTopicIds.length;

    const progress =
      totalTopics === 0
        ? 0
        : Math.round((completedTopicsCount / totalTopics) * 100);

    res.json({ progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;