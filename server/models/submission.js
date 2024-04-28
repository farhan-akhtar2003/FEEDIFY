const mongoose = require("mongoose");

// Define schema for a single answer to a question
const AnswerSchema = new mongoose.Schema({
  quesTitle: {
    type: String,
    required: true,
  },
  quesType: {
    type: String,
    enum: [
      "short-text",
      "long-text",
      "number",
      "multioption-singleanswer",
      "multioption-multianswer",
    ],
    required: true,
  },
  response: { type: mongoose.Schema.Types.Mixed, required: true },
});

// Define schema for a single response
const ResponseSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
  answers: [AnswerSchema],
});

// Define schema for the submission model
const SubmissionSchema = new mongoose.Schema({
  formID: {
    type: String,
    required: true,
  },
  formTitle: { type: String, required: true },
  facultyID: {
    type: String,
    default: null,
  },
  responses: [ResponseSchema],
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
