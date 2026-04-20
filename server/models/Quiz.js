import mongoose from "mongoose";

// Schema for a single question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },

  options: {
    type: [String],
    required: true,
  },

  correctAnswer: {
    type: Number, 
    required: true,
  },

 
  codeSnippet: {
    type: String,
    default: "",
  },
});

// Schema for quiz
const quizSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);