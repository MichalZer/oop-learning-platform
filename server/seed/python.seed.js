export const pythonLessonsSeed = (topicsMap) => [
  {
    topicId: topicsMap["python"],
    title: "Introduction to the Language",
    content: `Python is a general-purpose programming language used in many areas such as backend development, data science, automation, and machine learning.

It is known for its readability and simplicity, which allows developers to write clean and understandable code.

Unlike some other languages, Python uses indentation instead of curly braces to define code blocks.

Python is widely used in industry and is considered one of the most important programming languages today.`,
    order: 1,
  },

  {
    topicId: topicsMap["python"],
    title: "Core Syntax & Writing Code",
    content: `Python is dynamically typed, meaning variables do not require explicit type declarations.

Example:
x = 10
name = "Michal"
flag = True

Common data types include:
- int
- float
- string
- boolean
- list
- dictionary

Functions are defined using the def keyword:

def add(a, b):
    return a + b

Lists:
arr = [1, 2, 3]

Dictionaries:
user = {"name": "Michal", "age": 20}

Python emphasizes readability, so indentation is required and defines the structure of the program.`,
    order: 2,
  },

  {
    topicId: topicsMap["python"],
    title: "Working with Objects & Functions",
    content: `In Python, everything is an object.

Objects can contain both data and behavior.

Example:
class User:
    def greet(self):
        return "Hello"

Functions inside classes are called methods.

The keyword self refers to the current object instance.

Example:
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "Hello " + self.name

Understanding self is critical for working with objects in Python.`,
    order: 3,
  },

  {
    topicId: topicsMap["python"],
    title: "Classes & OOP in Python",
    content: `Python supports object-oriented programming through classes.

Example:
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return "Hello " + self.name

Creating an object:
user = User("Michal", 20)

The __init__ method is the constructor and is called when a new object is created.

Methods define behavior, and attributes define state.`,
    order: 4,
  },

  {
    topicId: topicsMap["python"],
    title: "Advanced OOP Concepts",
    content: `Python supports the main OOP principles:

Encapsulation:
Using naming conventions like _variable to indicate protected data.

Inheritance:
class Animal:
    def speak(self):
        return "Sound"

class Dog(Animal):
    def speak(self):
        return "Bark"

Polymorphism:
Same method behaves differently depending on the object.

super():
Used to call methods from the parent class.

These concepts allow building scalable and maintainable systems.`,
    order: 5,
  },
];

export const pythonQuizSeed = (topicsMap) => [
  {
    topicId: topicsMap["python"],
    language: "python",
    questions: [
      {
        questionText: "What defines code blocks in Python?",
        options: ["Curly braces", "Semicolons", "Indentation", "Comments"],
        correctAnswer: 2,
      },
      {
        questionText: "What is the role of __init__ in a Python class?",
        options: [
          "Delete variables",
          "Initialize object data",
          "Print output",
          "Loop over values",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What does 'self' represent?",
        options: [
          "The class itself",
          "The current object instance",
          "A global variable",
          "A function parameter only",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What will be the output?",
        options: ["Error", "Hello", "Hello Dana", "Dana"],
        correctAnswer: 2,
        codeSnippet: `class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return "Hello " + self.name

u = User("Dana")
print(u.greet())`,
      },
      {
        questionText: "What is inheritance?",
        options: [
          "Deleting data",
          "Copying code manually",
          "A class receiving properties from another class",
          "Looping over objects",
        ],
        correctAnswer: 2,
      },
      {
        questionText: "What will happen?",
        options: ["Works", "Error", "None", "Undefined"],
        correctAnswer: 1,
        codeSnippet: `class User:
    def __init__(self):
        self.name = "Dana"

u = User()
print(u.age)`,
      },
      {
        questionText: "Which type represents key-value pairs?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: 2,
      },
      {
        questionText: "What is polymorphism?",
        options: [
          "Deleting methods",
          "Same method behaving differently",
          "Creating variables",
          "Looping logic",
        ],
        correctAnswer: 1,
      },
    ],
  },
];