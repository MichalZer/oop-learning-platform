import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Topic from "./models/Topic.js";
import Lesson from "./models/Lesson.js";

dotenv.config();
await connectDB();

await Topic.deleteMany({});
await Lesson.deleteMany({});

const jsTopics = await Topic.create({
  title: "javascript basics",
  description:
    "learn the basics of javascript, the most popular programming language in the world",
  order: 1,
});

await Lesson.insertMany([
  {
    topicId: jsTopics._id,
    title: "variables",
    content: "const, vars and lets.....",
    order: 1,
  },
  {
    topicId: jsTopics._id,
    title: "Functions",
    content: "Functions allow reusable code...",
    order: 2,
  },
  {
    topicId: jsTopics._id,
    title: "Objects",
    content: "Objects store key-value data...",
    order: 3,
  },
]);

console.log("🌱 Seed completed");
process.exit();
