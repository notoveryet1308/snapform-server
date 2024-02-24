const javascriptQuiz = {
  id: "123456789",
  title: "Sample Live Quiz",
  questions: [
    {
      id: "question_1",
      title: "What is the capital of France?",
      description: "Select capital of france",
      options: [
        { order: "A", label: "Paris", isCorrectChoice: true },
        { order: "B", label: "London", isCorrectChoice: false },
        { order: "C", label: "Berlin", isCorrectChoice: false },
        { order: "D", label: "Rome", isCorrectChoice: false },
      ],
      questionType: "SINGLE_SELECT",
    },
  ],
  configuration: {
    question_1: { timeLimit: 30, point: 1500 },
  },
};

export { javascriptQuiz };
