import React, { useState } from "react";
import axios from "axios";
import forwardIcon from "../../../public/Image/forwardIcon.png";
import backwardIcon from "../../../public/Image/backwardIcon.png";

const TextQuesResponse = ({ selectedQuestion, data }) => {
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleNextResponse = () => {
    setCurrentResponseIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalResponses - 1)
    );
  };

  const handlePrevResponse = () => {
    setCurrentResponseIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = async (inputText) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post("/nlp", { inputs: inputText });
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedQuestion) {
    return (
      <p className="bg-n-6 text-black m-auto flex justify-center ">
        No Question Selected yet
      </p>
    ); // Or render a placeholder message
  }

  const selectedQuestionData = data.find(
    (question) => question.quesTitle === selectedQuestion
  );

  if (!selectedQuestionData) {
    return (
      <p className="bg-n-6 text-black m-auto flex justify-center">
        Unmatched Question
      </p>
    ); // Or render a placeholder message
  }

  const totalResponses = selectedQuestionData.response.length;

  return (
    <div className="w-1/2 p-4 bg-[#f8f8ff] text-gray-800 rounded">
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        <p className="mb-2">
          {selectedQuestionData.response[currentResponseIndex]}
        </p>
      </div>
      <div className="flex w-auto h-auto justify-between bg-n-1 ">
        <button
          className={`w-auto bg-transparent rounded-full hover:bg-blue-100 ${
            currentResponseIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevResponse}
          disabled={currentResponseIndex === 0}
        >
          <img className="w-6 h-6" src={backwardIcon} alt="Backward Icon" />
        </button>
        <button
          className={` px-2 text-white py-1 rounded bg-red-500 hover:bg-red-700 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          onClick={() =>
            handleSubmit(selectedQuestionData.response[currentResponseIndex])
          }
          disabled={loading}
        >
          {loading ? (
            <span className="spinner white "></span>
          ) : (
            <span>Use NLP Summarizer</span>
          )}
        </button>
        <button
          className={`w-auto bg-transparent rounded-full hover:bg-blue-100 ${
            currentResponseIndex === totalResponses - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleNextResponse}
          disabled={currentResponseIndex === totalResponses - 1}
        >
          <img className="w-6 h-6" src={forwardIcon} alt="Forward Icon" />
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
      {/* <h2 className="text-gray-800 pt-1">Summarized:</h2> */}
      {/* Display error message */}
      {result && (
        <div className="pb-5  bg-gray-200 text-gray-800 rounded mt-2">
          <p className="text-red-600 pl-1">{JSON.stringify(result, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

export default TextQuesResponse;
