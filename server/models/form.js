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
      required: {
        type: Boolean,
        default: false,
      },
    },
  ],
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the faculty user
    default: null, // Set default value to null
  },
  accessibleTo: {
    type: [mongoose.Schema.Types.ObjectId], // Define as an array
    ref: "User", // Reference to the user model for students
    default: [], // Set default value to an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
