import mongoose from "mongoose";
const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: Number,
});

export default mongoose.model("Topic", topicSchema);