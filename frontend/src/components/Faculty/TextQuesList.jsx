import React, { useState } from "react";

const TextQuesList = ({ questions, onQuestionClick }) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
    onQuestionClick(index);
  };
  //console.log(questions);
  return (
    <div className="w-1/2  p-4 bg-gray-900 rounded text-white overflow-y-auto">
      {/* <h2 className="text-lg font-bold mb-4">
        Question List - Text Field Type :{" "}
      </h2> */}
      <ul>
        {questions.map((question, index) => {
          // Check if 'response' is an array, if yes, skip rendering this question
          if (Array.isArray(question.response) === false) {
            return null;
          }
          return (
            <li
              key={index}
              className={`cursor-pointer mb-2 rounded-lg overflow-hidden ${
                selectedQuestionIndex === index ? "bg-gray-800" : "bg-gray-900"
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              <div
                className={`flex items-center p-2 ${
                  selectedQuestionIndex === index
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
              >
                <div
                  className={`w-8 h-8 text-yellow-500 flex items-center justify-center mr-2 ${
                    selectedQuestionIndex === index ? "bg-opacity-90" : ""
                  }`}
                >
                  {index + 1}.
                </div>
                <div>{question.quesTitle}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TextQuesList;
