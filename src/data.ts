const javascriptQuiz = {
  metaInfo: {
    point: 1000,
    title: "JavaScript Quiz",
  },
  questions: [
    {
      questionLabel:
        "Which keyword is used to declare a constant in JavaScript?",
      options: ["var", "let", "const", "final"],
      answer: "const",
    },
    {
      questionLabel: "What does the DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Document Oriented Model",
        "Digital Ordinance Model",
      ],
      answer: "Document Object Model",
    },
    {
      questionLabel:
        "How can you check if a variable is an array in JavaScript?",
      options: [
        "isArray(variable)",
        "variable.isArray()",
        "Array.isArray(variable)",
        "variable.isTypeOf('array')",
      ],
      answer: "Array.isArray(variable)",
    },
    {
      questionLabel:
        "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        "Enforce strict type checking",
        "Enable new ECMAScript features",
        "Improve performance",
        "Catch common coding errors",
      ],
      answer: "Catch common coding errors",
    },
    {
      questionLabel: "Which of the following is a JavaScript package manager?",
      options: ["Bower", "Grunt", "npm", "Maven"],
      answer: "npm",
    },
    {
      questionLabel: "What is closure in JavaScript?",
      options: [
        "A block of code",
        "A data type",
        "A way to create private variables",
        "A function inside another function that has access to the outer function's variables",
      ],
      answer:
        "A function inside another function that has access to the outer function's variables",
    },
    {
      questionLabel: "What is the 'this' keyword in JavaScript?",
      options: [
        "A variable",
        "A method",
        "A reference to the current object",
        "A reserved word",
      ],
      answer: "A reference to the current object",
    },
    {
      questionLabel:
        "How can you convert a string to an integer in JavaScript?",
      options: [
        "parseInt(string)",
        "string.toInt()",
        "toInteger(string)",
        "castToInt(string)",
      ],
      answer: "parseInt(string)",
    },
    {
      questionLabel: "What does AJAX stand for?",
      options: [
        "Asynchronous JavaScript and XML",
        "All JavaScript and XML",
        "Advanced JavaScript and XML",
        "Asynchronous JSON and XML",
      ],
      answer: "Asynchronous JavaScript and XML",
    },
    {
      questionLabel:
        "Which method is used to add a new element to the end of an array in JavaScript?",
      options: ["push()", "append()", "addToEnd()", "insertEnd()"],
      answer: "push()",
    },
    {
      questionLabel: "What is the purpose of the 'bind' method in JavaScript?",
      options: [
        "To create a new array",
        "To bind a function to a context",
        "To concatenate two strings",
        "To filter an array",
      ],
      answer: "To bind a function to a context",
    },
    {
      questionLabel: "What does the 'typeof' operator do in JavaScript?",
      options: [
        "Check if a variable is defined",
        "Determine the type of a value",
        "Concatenate two strings",
        "Assign a variable",
      ],
      answer: "Determine the type of a value",
    },
    {
      questionLabel:
        "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "'==' performs type coercion, '===' does not",
        "'===' performs type coercion, '==' does not",
        "'==' compares values only, '===' compares both values and types",
        "'===' is deprecated in the latest ECMAScript specification",
      ],
      answer: "'==' compares values only, '===' compares both values and types",
    },
    {
      questionLabel:
        "Which event occurs when a user clicks on an HTML element?",
      options: ["onMouseClick", "onDoubleClick", "onClick", "onMouseUp"],
      answer: "onClick",
    },
  ],
};
