import express from 'express';
import Quiz from '../models/Quiz.js';
import Progress from "../models/progress.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Get all quizzes
router.get('/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params;
    const { lang } = req.query;

    if (!lang) {
      return res.status(400).json({ message: "Language is required" });
    }

    const quiz = await Quiz.findOne({ topicId, language: lang });

    if (!quiz || quiz.questions.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const safeQuestions = quiz.questions.map((q) => ({
      _id: q._id,
      question: q.questionText,
      options: q.options,
    }));

    res.json({ questions: safeQuestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { topicId, language, answers } = req.body;
    const userId = req.user.userId; // token payload uses userId

    // basic validation to protect against double-click or empty payload
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Invalid answers" });
    }

    const quiz = await Quiz.findOne({ topicId, language });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correctCount = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round(
      (correctCount / quiz.questions.length) * 100
    );

    const passed = score >= 80;

    let progress = await Progress.findOne({
      userId,
      topicId,
      language
    });

    if (!progress) {
      progress = new Progress({
        userId,
        topicId,
        language
      });
    }

    progress.attempts += 1;

    if (score > progress.bestScore) {
      progress.bestScore = score;
    }

    if (passed) {
      progress.status = "completed";
    }

    await progress.save();

    res.json({
      score,
      passed
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;