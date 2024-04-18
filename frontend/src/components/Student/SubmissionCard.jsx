function SubmissionCard({ submission }) {
  return (
    <div className="card text-gray-800">
      <div className="input text-gray-900">
        <label className="font-semibold">Q: {submission.quesTitle}</label>
        {submission.quesType === "multioption-singleanswer" ||
        submission.quesType === "multioption-multianswer" ? (
          <p className="inline text-green-800">
            Ans:
            <ul className="list-disc list-inside pl-5">
              {submission.response.map((v, index) => (
                <li key={index} className="text-green-800">
                  <span className=" bg-green-700 "></span>
                  {v}
                </li>
              ))}
            </ul>
          </p>
        ) : submission.quesType === "file" ? (
          <a
            href={submission.response}
            download
            className="link text-green-800"
          >
            {submission.response}
          </a>
        ) : (
          <p className="text-green-800">Ans: {submission.response}</p>
        )}
      </div>
    </div>
  );
}

export default SubmissionCard;
