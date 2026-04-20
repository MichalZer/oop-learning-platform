import dotenv from "dotenv";
import mongoose from "mongoose";

import Topic from "../models/Topic.js";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js";

import { topicsSeed } from "./topics.seed.js";
import {
  oopFoundationsLessonsSeed,
  oopFoundationsQuizSeed,
} from "./oopFoundations.seed.js";
import {
  javascriptLessonsSeed,
  javascriptQuizSeed,
} from "./javascript.seed.js";
import { pythonLessonsSeed, pythonQuizSeed } from "./python.seed.js";
import { cppLessonsSeed, cppQuizSeed } from "./cpp.seed.js";
import Progress from "../models/progress.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

// cleanup existing data
await Topic.deleteMany({});
await Lesson.deleteMany({});
await Quiz.deleteMany({});
await Progress.deleteMany({});

// topics
const createdTopics = await Topic.insertMany(
  topicsSeed.map(({ key, ...rest }) => rest)
);

// create a map of topic keys to their generated IDs for easy reference in lessons and quizzes
const topicsMap = {};
createdTopics.forEach((topic, index) => {
  topicsMap[topicsSeed[index].key] = topic._id;
});

// lessons
await Lesson.insertMany([
  ...oopFoundationsLessonsSeed(topicsMap),
  ...javascriptLessonsSeed(topicsMap),
  ...pythonLessonsSeed(topicsMap),
  ...cppLessonsSeed(topicsMap),
]);

// quizzes
await Quiz.insertMany([
  ...oopFoundationsQuizSeed(topicsMap),
  ...javascriptQuizSeed(topicsMap),
  ...pythonQuizSeed(topicsMap),
  ...cppQuizSeed(topicsMap),
]);

console.log("Seed completed successfully 🌱");
process.exit();