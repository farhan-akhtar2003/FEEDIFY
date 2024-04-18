import React from "react";

function SubmissionCard({ submission }) {
  //console.log("Submission prop:", submission);

  // Check if submission is defined and has answers
  if (submission && submission.answers && submission.answers.length > 0) {
    return (
      <div className="card text-gray-800">
        <div className="input text-gray-900">
          <div className="rounded-lg border-2 border-black bg-[#49796b] text-[#3affbd] p-2 mb-2">
            <p>
              Roll Number:
              <p className="font-bold text-n-1">{submission.studentID}</p>
            </p>
          </div>
          {submission.answers.map((answer, idx) => (
            <div key={idx}>
              <div className="rounded-lg border-2 border-gray-500 p-2 mb-2">
                <p className="font-semibold">Q: {answer.quesTitle}</p>
                {answer.quesType === "multioption-singleanswer" ||
                answer.quesType === "multioption-multianswer" ? (
                  <p className="inline text-green-700">
                    Ans:
                    <ul className="list-disc list-inside pl-5">
                      {answer.response.map((v, i) => (
                        <li key={i} className="text-green-800">
                          {v}
                        </li>
                      ))}
                    </ul>
                  </p>
                ) : answer.quesType === "file" ? (
                  <a
                    href={answer.response}
                    download
                    className="link text-green-800"
                  >
                    {answer.response}
                  </a>
                ) : (
                  <p className="text-green-800">Ans: {answer.response}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // Render a message if submission does not have answers
    return (
      <div className="card text-gray-800">
        <h3 className="msg mt-1 text-red-600">No Submissions yet</h3>
      </div>
    );
  }
}

export default SubmissionCard;
