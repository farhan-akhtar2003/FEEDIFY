import React, { useState } from "react";
import axios from "axios";

function HuggingFaceComponent() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/query", { inputs: inputText }); // Adjusted endpoint
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form className="p-48 " onSubmit={handleSubmit}>
        <textarea
          className="text-gray-800 h-60 w-60"
          value={inputText}
          placeholder="write for getting summary"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="mt-1 hover:bg-[#00827f] bg-[#319177] text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
      {result && (
        <div>
          <h2 className="text-gray-800">Result:</h2>
          <p className="text-black">{JSON.stringify(result, null, 2)}</p>
        </div>
      )}
    </div>
  );
}

export default HuggingFaceComponent;
