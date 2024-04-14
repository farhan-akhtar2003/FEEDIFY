import React, { useState } from "react";
import QuestionList from "../Faculty/QuestionList";
import QuesCharts from "../Faculty/QuesCharts";

const DummyData = [
  {
    id: 1,
    text: "How satisfied are you with the course material?",
    responses: {
      "Very Good": 10,
      Good:33,
      Bad: 65,
      Worst: 2,
    },
  },
  {
    id: 2,
    text: "How satisfied are you with the teaching quality?",
    responses: {
      "Very Good": 15,
      Good: 18,
      Bad: 6,
      Worst: 33,
    },
  },
  {
    id: 3,
    text: "How satisfied are you with the classroom environment?",
    responses: {
      "Very Good": 12,
      Good: 22,
      Bad: 4,
      Worst: 11,
    },
  },
  // Additional questions
  {
    id: 4,
    text: "How would you rate the course workload?",
    responses: {
      //   "Very Good": 8,
      //   Good: 14,
      Yes: 70,
      No: 30,
    },
  },
  {
    id: 5,
    text: "How effective were the course assessments?",
    responses: {
      "Very Good": 50,
      Good: 15,
      Bad: 54,
      Worst: 2,
    },
  },
  {
    id: 6,
    text: "Did the course meet your expectations?",
    responses: {
      Yes: 22,
      //   Good: 18,
      //   Bad: 6,
      No: 40,
    },
  },
  {
    id: 7,
    text: "How satisfied are you with the course organization?",
    responses: {
      "Very Good": 18,
      Good: 20,
      Bad: 33,
      Worst: 32,
    },
  },
  {
    id: 8,
    text: "How clear were the course instructions?",
    responses: {
      "Very Good": 22,
      Good: 16,
      Bad: 26,
      Worst: 25,
    },
  },
  {
    id: 9,
    text: "How helpful were the course resources?",
    responses: {
      "Very Good": 17,
      Good: 19,
      Bad: 4,
      Worst: 1,
      Very: 17,
      poor: 19,
      abs: 4,
      dhhd: 1,
    },
  },
  {
    id: 10,
    text: "How engaging were the course activities?",
    responses: {
      "Very Good": 34,
      Good: 4,
      Bad: 42,
      Worst: 81,
      Very: 33,
      poor: 56,
      abs: 47,
      dhhd: 21,
    },
  },
];

// export default DummyData;


const QuesChartsContainer = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
  };

  return (
    <div className="flex space-x-4">
      <QuestionList
        questions={DummyData}
        onQuestionClick={handleQuestionClick}
      />
      <QuesCharts selectedQuestion={selectedQuestion} data={DummyData} />
    </div>
  );
};

export default QuesChartsContainer;
