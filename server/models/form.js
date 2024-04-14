const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  endMessage: String,
  expiration: Number,
  fields: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
  ],
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the faculty user
    // required: true,
  },
   accessibleTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' // Reference to the user model for students
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
