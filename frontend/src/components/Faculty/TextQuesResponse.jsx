import React, { useState, useEffect } from "react";
import axios from "axios";
import forwardIcon from "../../../public/Image/forwardIcon.png";
import backwardIcon from "../../../public/Image/backwardIcon.png";

const TextQuesResponse = ({ selectedQuestion, data }) => {
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedNLP, setSelectedNLP] = useState(""); // State to store selected NLP task

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
      let response;
      if (selectedNLP === "summarizer") {
        response = await axios.post("/nlpsummarizer", { inputs: inputText });
      } else if (selectedNLP === "sentiment") {
        response = await axios.post("/nlpsentiment", { inputs: inputText });
      }
      //console.log(response.data);
      setResult(response.data);
    } catch (error) {
      setError("An error occurred while processing your request.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedNLP) {
      handleSubmit(selectedQuestionData.response[currentResponseIndex]);
    }
  }, [selectedNLP]);

  useEffect(() => {
    setSelectedNLP("");
  }, [currentResponseIndex]);

  useEffect(() => {
    setResult(null);
  }, [currentResponseIndex]);
  
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

        {/* Dropdown menu for selecting NLP task */}
        {loading ? (
          <span className="spinner red"></span>
        ) : (
          <select
            className="px-2 text-white  text-center py-1 rounded bg-red-500 hover:bg-red-700"
            value={selectedNLP}
            onChange={(e) => setSelectedNLP(e.target.value)}
          >
            <option value="">Select NLP Task</option>
            <option value="summarizer">NLP Summarizer</option>
            <option value="sentiment">NLP Sentiment Analysis</option>
          </select>
        )}

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
      {/* <h2 className="text-gray-800 pt-1">Summarized:</h2> */}
      {/* Display error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && result[0] && result[0].summary_text && (
        <div className="p-5 bg-slate-200 text-[#78184a] rounded mt-2">
          <p>{JSON.stringify(result, null, 2)}</p>
        </div>
      )}

      {result && result[0] && result[0].length > 0 && (
        <div className="bg-slate-200 text-black  rounded mt-2">
          {result[0].map((sentiment) => (
            <div
              key={sentiment.label}
              className="flex items-center py-2 mx-2 my-2"
            >
              <p className="mr-2 text-0.5xl ">{sentiment.label}</p>

              <div
                className={`h-4 mr-2 ml-2 ${
                  sentiment.label === "positive"
                    ? "bg-green-600"
                    : sentiment.label === "negative"
                    ? "bg-red-600"
                    : "bg-gray-600"
                } rounded`}
                style={{
                  width: `${sentiment.score * 100}%`, // score is between 0 and 1
                }}
              ></div>

              {typeof sentiment.score === "number" && (
                <p className="ml-2">{(sentiment.score * 100).toFixed(2)}%</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextQuesResponse;
