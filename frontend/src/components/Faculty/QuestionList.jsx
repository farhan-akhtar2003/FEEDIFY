import React, { useState } from "react";

const QuestionList = ({ questions, onQuestionClick }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
    onQuestionClick(questionId);
  };

  return (
    <div className="w-1/2 p-4 bg-gray-900 rounded-l-xl text-white">
      <h2 className="text-lg font-bold mb-4">Question List</h2>
      <ul>
        {questions.map((question) => (
          <li
            key={question.id}
            className={`cursor-pointer mb-2 rounded-lg overflow-hidden ${
              selectedQuestion === question.id ? "bg-gray-800" : "bg-gray-900"
            }`}
            onClick={() => handleQuestionClick(question.id)}
          >
            <div
              className={`flex items-center p-2 ${
                selectedQuestion === question.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <div
                className={`w-8 h-8 bg-gray-800 text-white flex items-center justify-center mr-2 ${
                  selectedQuestion === question.id ? "bg-opacity-90" : ""
                }`}
              >
                {question.id}
              </div>
              <div>{question.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
