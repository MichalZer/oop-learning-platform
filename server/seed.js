import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Topic from "./models/Topic.js";
import Lesson from "./models/Lesson.js";
import Quiz from "./models/Quiz.js";

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

await Quiz.create({
  topicId: ObjectId(jsTopics._id),
  language: "js",
  questions: [
    {
      questionText: "What is a class?",
      options: [
        "A function",
        "A blueprint for objects",
        "A variable",
        "An array"
      ],
      correctAnswer: 1
    },
    {
      questionText: "What keyword creates instance?",
      options: [
        "make",
        "new",
        "create",
        "class"
      ],
      correctAnswer: 1
    },
    {
      questionText: "Which keyword refers to the current object instance?",
      options: [
        "this",
        "self",
        "object",
        "instance"
      ],
      correctAnswer: 0 // "this"
    },
    {
      questionText: "Which method is automatically called when a class is instantiated?",
      options: [
        "init()",
        "start()",
        "constructor()",
        "main()"
      ],
      correctAnswer: 2 // "constructor()"
    },
    {
      questionText: "How do you implement inheritance in JavaScript classes?",
      options: [
        "using inherits",
        "using extends",
        "using prototype",
        "using super"
      ],
      correctAnswer: 1 // "extends"
    },
    {
      questionText : "Which function is used to call the constructor of a parent class?",
      options: [
        "parent()",
        "base()",
        "this()",
        "super()"
      ],
      correctAnswer: 3 // "super()"
    },
    {
      questionText: "What is the result of 'typeof' on a class in JS?",
      options: [
        "class",
        "object",
        "function",
        "undefined"
      ],
      correctAnswer: 2 // "function" (Classes are syntactical sugar over functions)
    }
  ]
});

console.log("🌱 Seed completed");
process.exit();
