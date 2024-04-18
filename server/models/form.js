const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

// Function to generate a random string
const generateRandomString = () => {
  return crypto.randomBytes(16).toString("hex");
};


const formSchema = new mongoose.Schema({
  formId: {
    type: String,
    default: function () {
      // Generate a unique identifier using timestamp and random string
      return Date.now().toString(36) + generateRandomString();
    },
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  endMessage: String,
  expiration: Number,
  fields: [
    {
      questionId: {
        type: String,
        default: function () {
          // Generate a unique identifier using timestamp and random string
          return Date.now().toString(36) + generateRandomString();
        },
        unique: true,
      },
      title: {
        type: String,
        default: null,
      },
      type: {
        type: String,
        default: null,
      },
      options: mongoose.Schema.Types.Mixed, // Allow for flexibility in storing options
      required: {
        type: Boolean,
        default: false,
      },
      // options: [String], // Add an options field for multiple option questions
    },
  ],
  faculty: {
    type: String,
    default: null, // Set default value to null
  },
  accessibleTo: {
    type: [String], // Define as an array of strings
    default: [], // Set default value to an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


formSchema.index({ formId: 1 });


const Form = mongoose.model("Form", formSchema);

module.exports = Form;
