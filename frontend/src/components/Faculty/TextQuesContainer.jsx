import React, { useState } from "react";
import TextQuestionList from "../Faculty/TextQuesList.jsx";
import TextQuesResponse from "../Faculty/TextQuesResponse.jsx";

const TextQuesContainer = ({ allanswer }) => {
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestionTitle(allanswer[index].quesTitle);
  };
  return (
    <>
      <h2 className="text-lg font-bold text-gray-900 m-5 ">
        Question List - Text Field Type :{" "}
      </h2>
      <div className="flex space-x-4 h-1/2 mt-4 bg-n-8 border border-gray-200 rounded p-4">
        <TextQuestionList
          questions={allanswer}
          onQuestionClick={handleQuestionClick}
        />
        <TextQuesResponse
          selectedQuestion={selectedQuestionTitle}
          data={allanswer}
        />
      </div>
    </>
  );
};

export default TextQuesContainer;
