const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userType: {
    type: String,
    enum: ["Admin", "Faculty", "Student"],
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
