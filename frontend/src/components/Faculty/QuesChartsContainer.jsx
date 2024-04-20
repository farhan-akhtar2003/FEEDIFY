// QuesChartsContainer.jsx
import React, { useState } from "react";
import QuestionList from "../Faculty/QuestionList";
import QuesCharts from "../Faculty/QuesCharts";

const QuesChartsContainer = ({ allanswer }) => {
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestionTitle(allanswer[index].quesTitle);
  };

  return (
    <>
      <h2 className="text-lg font-bold text-gray-900 m-5 ">
        Question List - MCQ Type :{" "}
      </h2>
      <div className="flex space-x-4 h-[35rem] mt-4 bg-n-8 border border-gray-200 rounded p-4">
        <QuestionList
          questions={allanswer}
          onQuestionClick={handleQuestionClick}
        />
        <QuesCharts
          selectedQuestion={selectedQuestionTitle} // Pass the title instead of index
          data={allanswer}
        />
      </div>
    </>
  );
};

export default QuesChartsContainer;
