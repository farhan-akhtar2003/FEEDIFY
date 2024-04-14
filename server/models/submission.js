const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form", // Reference to the Form model
    required: true,
  },
  responses: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      answers: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String, // Adjust the data type based on the type of answers expected
            required: true,
          },
        },
      ],
    },
  ],
//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
