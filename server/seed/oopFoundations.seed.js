export const oopFoundationsLessonsSeed = (topicsMap) => [
  {
    topicId: topicsMap["oop_foundations"],
    title: "OOP Foundations",
    content: `Object-Oriented Programming (OOP) is an approach to software development in which code is organized around objects instead of separate functions only.

When software systems grow, code that is built only from disconnected functions becomes harder to manage:
- it is harder to understand what belongs to what
- a small change can affect unrelated parts
- responsibilities are not clearly separated

OOP helps solve this by organizing software around entities, where each entity is responsible for its own data and behavior.

An object is an entity that combines:
- state (data)
- behavior (actions)

For example, a user in a system may have:
- data: name, email
- behavior: login, logout

A class is a blueprint, while an object is an instance created from that blueprint.
For example:
- Class: User
- Objects: Michal, Dana, Yossi

Encapsulation means that not every piece of data should be directly accessible from everywhere.
Instead of exposing internal data freely, access is controlled through defined actions.
For example, in a bank account system, the balance should not be changed directly from outside. It should only be updated through actions such as deposit or withdraw.

Inheritance allows one class to receive properties and behavior from another class.
This is useful when there is a hierarchical relationship.
For example:
- a general class: Animal
- specific classes: Dog, Cat

Polymorphism means that the same action can behave differently depending on the object.
For example, the action "make sound" may produce:
- Dog -> bark
- Cat -> meow

Abstraction means hiding unnecessary implementation details and exposing only what is needed.
A user of a system does not need to know how every internal part works, only how to use the available functionality.

The most important part of OOP is not syntax but the way of thinking.
When designing a system, we ask:
- what entities exist?
- what responsibility does each entity have?
- what data does each entity hold?
- what actions can it perform?

Good separation between entities leads to code that is clearer, easier to extend, and easier to maintain.`,
    order: 1,
  },
];

export const oopFoundationsQuizSeed = (topicsMap) => [
  {
    topicId: topicsMap["oop_foundations"],
    language: "general",
    questions: [
      {
        questionText:
          "Which problem does OOP mainly try to solve in large systems?",
        options: [
          "Lack of memory",
          "Disorganized code that is hard to maintain",
          "Slow internet connection",
          "Lack of variables",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "Which option best describes an object?",
        options: [
          "Only data",
          "Only functions",
          "Data together with behavior",
          "A loop structure",
        ],
        correctAnswer: 2,
      },
      {
        questionText:
          "What is the difference between a class and an object?",
        options: [
          "There is no difference",
          "A class is a blueprint and an object is an instance of it",
          "An object creates a class",
          "A class is a variable",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What is the main goal of encapsulation?",
        options: [
          "To make code longer",
          "To control access to data",
          "To remove methods",
          "To create more variables",
        ],
        correctAnswer: 1,
      },
      {
        questionText: "What best describes polymorphism?",
        options: [
          "One action with different behavior depending on the object",
          "Deleting code",
          "A constant variable",
          "A nested loop",
        ],
        correctAnswer: 0,
      },
    ],
  },
];