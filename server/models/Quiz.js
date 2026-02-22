import mongoose from "mongoose";
const qustionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
    topicId: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic', required: true,
    required: true },
    language: { type: String, required: true },
    questions: [qustionSchema],
}, {timestamps:true}
);
export default mongoose.model("Quiz", quizSchema);