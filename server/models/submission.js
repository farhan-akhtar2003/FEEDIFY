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
    type: String, // Changed to String type
    required: true,
  },
  answers: [AnswerSchema], // Array of answers
});

// Define schema for the submission model
const SubmissionSchema = new mongoose.Schema({
  formID: {
    type: String, // Changed to String type
    required: true,
  },
  formTitle: { type: String, required: true },
  facultyID: {
    type: String,
    default: null,
  },
  responses: [ResponseSchema], // Array of responses
});

// Define and export the Submission model
const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
