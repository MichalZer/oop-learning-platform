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
await Quiz.deleteMany({});

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
    content: `# JavaScript Variables — Complete Beginner Explanation

A variable in JavaScript is a container used to store data in memory so that the program can reuse it later. You can think about a variable as a labeled box. The label represents the variable name, and the content inside the box represents the value stored in it. Once a value is stored inside a variable, the program can access or modify it whenever needed.

For example:

javascript
let age = 25;

In this example, age is the variable name and 25 is the value stored inside the variable. The program now remembers this information and can use it later.

Variables are essential because programs constantly need to remember information. Applications store usernames, prices, settings, calculations, and user inputs using variables. Without variables, software would not be able to react dynamically or keep track of data.

JavaScript provides three different ways to declare variables: var, let, and const. Although all three create variables, they behave differently and understanding these differences is critical for writing modern JavaScript.

The keyword var is the oldest way to declare variables. It was used before modern JavaScript standards existed. Variables declared with var are function-scoped, meaning they belong to the entire function rather than a specific block of code. A variable declared with var can also be reassigned and redeclared, which often causes unexpected bugs in large applications.

Example:

var city = "London";
var city = "Paris";

Because of these problems, professional developers rarely use var today.

The keyword let was introduced in ES6 to solve many issues caused by var. A variable declared with let is block-scoped, meaning it only exists inside the block surrounded by curly braces {}. Variables declared with let can change their value, but they cannot be declared again in the same scope.

Example:

let score = 100;
score = 200;

This makes let suitable when the stored value is expected to change during program execution.

The keyword const is used to declare constant variables. A const variable must receive a value immediately when it is created, and its reference cannot be reassigned later. This does not mean the internal content is always immutable, especially when working with objects or arrays.

Example:

const pi = 3.14;

Trying to assign a new value will cause an error:

pi = 4;

However, when storing objects, modification of properties is still allowed because const protects the reference, not the internal data.

const user = { name: "Anna" };
user.name = "David";

Another important concept related to variables is scope. Scope determines where a variable is accessible in the program. A globally declared variable can be accessed anywhere in the code, while block-scoped variables exist only inside the block where they were created.

Example:

if (true) {
  let message = "Hello";
}

Trying to access message outside the block will produce an error because the variable no longer exists outside that scope.

JavaScript also performs a behavior called hoisting. During execution, variable declarations are internally moved to the top of their scope. Variables declared with var are initialized as undefined, which can lead to confusing results.

Example:

console.log(a);
var a = 5;

The output will be undefined. In contrast, let and const variables exist in a phase called the Temporal Dead Zone, meaning they cannot be accessed before declaration and will throw an error instead.

Variable naming is also important. Names must start with a letter, underscore, or dollar sign and cannot begin with numbers. JavaScript is case-sensitive, meaning age and Age are considered different variables. Developers usually follow camelCase naming such as userAge or totalPrice to improve readability.

Variables in JavaScript can store different types of data including strings, numbers, booleans, objects, arrays, null values, and undefined values.

Example:

let name = "Alice";
let age = 25;
let isAdmin = true;
let list = [];
let user = {};

JavaScript is dynamically typed, meaning a variable can change its data type during runtime.

let value = 10;
value = "hello";

Although allowed, changing types frequently can make code harder to maintain.

Beginners commonly make mistakes when working with variables. One frequent mistake is using a variable before declaring it, which causes errors when using let or const. Another common issue is forgetting to declare variables using let or const, which accidentally creates global variables and leads to unpredictable behavior.

Reassigning a const variable is another typical error, as well as confusing assignment (=) with comparison (===). Developers must remember that = assigns a value, while === compares values strictly.

Good development practice suggests using const by default and switching to let only when reassignment is necessary. Avoiding global variables, choosing meaningful variable names, and limiting scope help create clean and maintainable code.

A simple real-world example demonstrates variable usage:

const productName = "Laptop";
let price = 1000;

price = price - 100;

console.log(productName, price);

This program stores product information, updates the price, and prints the final result.

In professional JavaScript development, the common rule is simple: start with const, use let when values must change, and avoid using var in modern applications.`,
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
  topicId: jsTopics._id,
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
