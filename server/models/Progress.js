import mongoose from "mongoose";
import User from "./User.js";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    completed: { type: Boolean, default: false },

    score: { type: Number, default: 0 },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    language: { type: String, required: true },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    bestScore: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("progress", progressSchema);
