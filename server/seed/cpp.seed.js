export const cppLessonsSeed = (topicsMap) => [
  {
    topicId: topicsMap["cpp"],
    title: "Introduction to the Language",
    content: `C++ is a general-purpose programming language widely used in systems programming, game development, and performance-critical applications.

It is considered a statically typed and compiled language, meaning that variable types must be declared and the code is compiled before execution.

C++ provides both high-level programming features (such as classes and object-oriented programming) and low-level control (such as memory management).

Because of this, C++ is powerful but requires more attention to detail compared to languages like Python or JavaScript.`,
    order: 1,
  },

  {
    topicId: topicsMap["cpp"],
    title: "Core Syntax & Writing Code",
    content: `In C++, variables must have a defined type.

Examples:
int x = 10;
double y = 3.14;
string name = "Michal";

A basic program:
#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    return 0;
}

Functions:
int add(int a, int b) {
    return a + b;
}

C++ syntax is strict:
- semicolons are required
- types must be declared
- code is compiled before execution`,
    order: 2,
  },

  {
    topicId: topicsMap["cpp"],
    title: "Objects & Basic OOP",
    content: `C++ supports object-oriented programming using classes.

Example:
class User {
public:
    string name;

    void greet() {
        cout << "Hello " << name << endl;
    }
};

Creating an object:
User u;
u.name = "Michal";
u.greet();

An object combines:
- data (fields)
- behavior (methods)`,
    order: 3,
  },

  {
    topicId: topicsMap["cpp"],
    title: "Classes & OOP in C++",
    content: `Classes define the structure of objects.

Example:
class User {
private:
    string name;

public:
    User(string n) {
        name = n;
    }

    void greet() {
        cout << "Hello " << name << endl;
    }
};

User u("Dana");
u.greet();

C++ uses access modifiers:
- public
- private

Encapsulation is enforced using these modifiers.`,
    order: 4,
  },

  {
    topicId: topicsMap["cpp"],
    title: "Advanced OOP Concepts",
    content: `C++ supports advanced OOP concepts:

Inheritance:
class Animal {
public:
    virtual void speak() {
        cout << "Sound" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Bark" << endl;
    }
};

Polymorphism:
Using virtual functions allows different behavior depending on the object type.

Example:
Animal* a = new Dog();
a->speak(); // Bark

Encapsulation:
Using private members to protect data.

These features allow building complex and efficient systems.`,
    order: 5,
  },
];

export const cppQuizSeed = (topicsMap) => [
  {
    topicId: topicsMap["cpp"],
    language: "cpp",
    questions: [
      {
        questionText: "Which of the following is required in C++ variable declaration?",
        options: [
          "No type definition",
          "Type must be specified",
          "Only value is needed",
          "Only function declaration",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What is the output method in C++?",
        options: ["print()", "console.log()", "cout", "echo"],
        correctAnswer: 2,
      },
      {
        questionText: "What is the role of a class?",
        options: [
          "Execute loops",
          "Store only data",
          "Define structure of objects",
          "Print values",
        ],
        correctAnswer: 2,
      },
      {
        questionText: "What will be the output?",
        options: ["Hello Dana", "Error", "Dana", "Nothing"],
        correctAnswer: 0,
        codeSnippet: `#include <iostream>
using namespace std;

class User {
public:
    string name;

    void greet() {
        cout << "Hello " << name << endl;
    }
};

int main() {
    User u;
    u.name = "Dana";
    u.greet();
}`,
      },
      {
        questionText: "What does private mean?",
        options: [
          "Accessible everywhere",
          "Accessible only inside the class",
          "Deletes variables",
          "Creates loops",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What is inheritance?",
        options: [
          "Deleting classes",
          "Class receiving properties from another class",
          "Looping over data",
          "Printing values",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What will be printed?",
        options: ["Sound", "Bark", "Error", "Nothing"],
        correctAnswer: 1,
        codeSnippet: `class Animal {
public:
    virtual void speak() {
        cout << "Sound" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Bark" << endl;
    }
};

int main() {
    Animal* a = new Dog();
    a->speak();
}`,
      },
      {
        questionText: "What is polymorphism?",
        options: [
          "Deleting functions",
          "Same function behaving differently",
          "Declaring variables",
          "Loop structure",
        ],
        correctAnswer: 1,
      },
    ],
  },
];