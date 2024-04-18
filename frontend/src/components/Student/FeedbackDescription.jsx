import React from "react";

function FeedbackDescription({ model }) {
  const { title, faculty, expiration } = model;

  return (
    <div className="rounded-lg shadow-md bg-n-4 p-5 m-5 mt-10">
      <div className="feedback-description text-white">
        <p className="text-2xl">
          <span className="font-semibold text-3xl text-cyan-300">ADMIN NAME :</span>{" "}
          NIT JALANDHAR
        </p>
        <p className="text-2xl">
          <span className="font-semibold text-3xl text-cyan-100">
            FEEDBACK TITLE :
          </span>{" "}
          {title}
        </p>
        <p className="text-2xl">
          <span className="font-semibold text-3xl text-cyan-100">
            FACULTY NAME :
          </span>{" "}
          {faculty ? faculty : "_____________"}
        </p>
        <p className="text-2xl">
          <span className="font-semibold text-3xl text-black">EXPIRATION :</span>{" "}
          {expiration ? expiration : "null"}
        </p>
      </div>
    </div>
  );
}

export default FeedbackDescription;
