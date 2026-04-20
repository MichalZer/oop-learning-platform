export const javascriptLessonsSeed = (topicsMap) => [
  {
    topicId: topicsMap["javascript"],
    title: "Introduction to the Language",
    content: `JavaScript is a general-purpose programming language that is used mainly for web development.

It can run:
- in the browser (Frontend)
- on the server using environments such as Node.js

JavaScript is a central part of modern web applications because it allows developers 
to build interactive user interfaces, handle events, communicate with APIs, and create full applications.

Main characteristics of the language:
- dynamic typing
- flexible syntax
- heavy use of objects and functions
- support for object-oriented programming

At this stage, the goal is to understand what JavaScript is, where it is used,
 and why it is considered an important language in software development.`,
    order: 1,
  },
  {
    topicId: topicsMap["javascript"],
    title: "Core Syntax & Writing Code",
    content: `In JavaScript, variables can be declared using let, const, and var.

Example:
let count = 10;
const name = "Michal";
var total = 5;

let:
- can be reassigned
- has block scope

const:
- cannot be assigned a new value
- also has block scope

var:
- can be reassigned
- has function scope
- is older and less recommended in modern JavaScript

JavaScript is dynamically typed, which means that a variable does not need a declared type in advance.
The type is determined by the value assigned to it.

Common types include:
- Number
- String
- Boolean
- Object
- Array
- null
- undefined

A variable can later hold a value of a different type.

Functions can be written using standard syntax:
function add(a, b) {
  return a + b;
}

Or using arrow functions:
const add = (a, b) => a + b;

Objects are a central structure in JavaScript:
const user = {
  name: "Michal",
  age: 20
};

Arrays are also common:
const arr = [1, 2, 3];

JavaScript also performs automatic type conversion in some expressions, so operations on values may behave
 differently depending on the data involved.`,
    order: 2,
  },
  {
    topicId: topicsMap["javascript"],
    title: "Working with Objects & Functions",
    content: `In JavaScript, objects are not used only for storing data. They can also contain functions
     that describe behavior.

Example:
const user = {
  name: "Michal",
  greet() {
    return "Hello " + this.name;
  }
};

This object contains:
- state: name
- behavior: greet

Functions that belong to an object are called methods.

The keyword this refers to the object on which the method was called.

Example:
const user = {
  name: "Michal",
  age: 20,
  increaseAge() {
    this.age++;
  }
};

user.increaseAge();

Objects in JavaScript are reference values.
This means that when one object is assigned to another variable, both variables refer to the same object.

Example:
const a = { x: 1 };
const b = a;

b.x = 5;

Now a.x is also 5.

This behavior is important because it affects how data changes across the program.

Understanding objects, methods, this, and references is essential before moving to class-based OOP in JavaScript.`,
    order: 3,
  },
  {
    topicId: topicsMap["javascript"],
    title: "Classes & OOP in JavaScript",
    content: `JavaScript supports object-oriented programming through classes.

A class defines the structure and behavior of objects that will be created from it.

Example:
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Hello " + this.name;
  }
}

The constructor is a special method that runs when a new object is created.

To create an object from a class, use new:
const user1 = new User("Michal", 20);

This creates an instance of the class.

Methods defined inside the class are shared by the objects created from it.

Classes provide a cleaner and more structured way to write OOP code compared to manually writing object literals.

In JavaScript, class syntax is built on top of the language's object model, but for practical development it is
 the standard way to organize object-oriented code.`,
    order: 4,
  },
  {
    topicId: topicsMap["javascript"],
    title: "Advanced OOP Concepts",
    content: `JavaScript supports the main object-oriented programming concepts:

Encapsulation:
Encapsulation limits direct access to internal data and allows controlled access through methods.

Example:
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  checkPassword(input) {
    return this.#password === input;
  }
}

Inheritance:
A class can inherit from another class using extends.

Example:
class Animal {
  speak() {
    return "Sound";
  }
}

class Dog extends Animal {
  speak() {
    return "Bark";
  }
}

Polymorphism:
The same method name can behave differently in different classes.
For example, both Animal and Dog may have a speak method, but the result is different.

super:
When a child class needs to use the constructor or methods of the parent class, it uses super.

These concepts allow developers to write reusable, organized, and maintainable code.`,
    order: 5,
  },
];

export const javascriptQuizSeed = (topicsMap) => [
  {
    topicId: topicsMap["javascript"],
    language: "js",
    questions: [
      {
        questionText: "Given the following code, what will be the result?",
        options: ["Hello Dana", "Hello", "undefined", "An error will be thrown"],
        correctAnswer: 2,
        codeSnippet: `const user = {
  name: "Dana",
  greet() {
    return "Hello " + this.name;
  }
};

const f = user.greet;
console.log(f());`,
      },
      {
        questionText: "Given the following code, what will be the result?",
        options: ["A", "B", "undefined", "An error will be thrown"],
        correctAnswer: 1,
        codeSnippet: `class User {
  constructor(name) {
    this.name = name;
  }
}

const u1 = new User("A");
const u2 = u1;

u2.name = "B";

console.log(u1.name);`,
      },
      {
        questionText: "What is the role of a constructor in a JavaScript class?",
        options: [
          "To print values to the console",
          "To initialize object data when an instance is created",
          "To define global variables",
          "To delete properties from an object",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "Given the following code, what will be printed?",
        options: ["Sound Sound", "Bark Bark", "Sound Bark", "Bark Sound"],
        correctAnswer: 2,
        codeSnippet: `class Animal {
  speak() {
    return "Sound";
  }
}

class Dog extends Animal {
  speak() {
    return "Bark";
  }
}

const a = new Animal();
const d = new Dog();

console.log(a.speak(), d.speak());`,
      },
      {
        questionText: "What will happen in the following code?",
        options: ["The value will be printed", "undefined will be printed", "A syntax or access error will occur", "null will be printed"],
        correctAnswer: 2,
        codeSnippet: `class User {
  #password = "1234";
}

const u = new User();
console.log(u.#password);`,
      },
      {
        questionText: "Given the following code, what will be the result?",
        options: ['"52"', "10", "NaN", "An error will be thrown"],
        correctAnswer: 1,
        codeSnippet: `let x = "5";
let y = 2;

console.log(x * y);`,
      },
      {
        questionText: "Which statement about var is correct?",
        options: [
          "It has block scope",
          "It has function scope",
          "It cannot be reassigned",
          "It does not exist in JavaScript",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "Given the following code, what will be the result?",
        options: ["0", "1", "undefined", "An error will be thrown"],
        correctAnswer: 1,
        codeSnippet: `class Counter {
  constructor() {
    this.count = 0;
  }

  inc() {
    this.count++;
  }
}

const c1 = new Counter();
const c2 = c1;

c2.inc();

console.log(c1.count);`,
      },
    ],
  },
];