//FEEDIFY>SERVER>CONTROLLERS>authController.js
const User = require("../models/user");
const Form = require("../models/form"); // Import the Form model
const Submission = require("../models/submission"); // Import the Submission model
const { comparePassword, hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { userId, userType, name, email, password } = req.body;

    // Check if all required fields are provided
    if (!userId || !userType || !name || !email || !password) {
      return res.json({
        error: "All fields are must required",
      });
    }

    // // Check if password meets requirements
    // if (password.length != 8) {
    //   return res.json({
    //     error: "Password should be 8 characters long",
    //   });
    // }

    // Check if email already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.json({
        error: "This email is already in use",
      });
    }

    // Check if userId already exists
    const existUserId = await User.findOne({ userId });
    if (existUserId) {
      return res.json({
        error: "This userId is already in use",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user in database
    const user = await User.create({
      userType,
      userId,
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // Check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      // Generate JWT token with userType, userId, name, and email
      jwt.sign(
        {
          id: user._id,
          userType: user.userType,
          rollId: user.userId,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          // Set JWT token in cookie
          res.cookie("token", token).json({
            type: user.userType,
            rollId: user.userId,
            email: user.email,
            id: user._id,
          });
        }
      );
    } else {
      return res.json({
        error: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Respond with success message
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  const { token } = await req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// Function to create a form
const createForm = async (req, res) => {
  try {
    const { title, endMessage, expiration, fields, facultyId, accessibleTo } =
      req.body;
    const createdBy = req.user.id;

    const form = new Form({
      title,
      endMessage,
      expiration,
      fields,
      faculty: facultyId,
      accessibleTo,
      createdBy,
    });

    await form.save();

    res.status(201).json({ message: "Form created successfully", form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch forms
// Use Form.find() to fetch all forms from the database.
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch a single form
const getForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Function to delete a form
const deleteForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    await Form.findByIdAndDelete(formId);
    // Also delete associated submissions
    await Submission.deleteMany({ form: formId });
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Function to submit a form
const submitForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    const submissionData = req.body;
    const submission = new Submission({
      form: formId,
      data: submissionData,
    });
    await submission.save();
    res.json(submission);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch submissions for a form
const getSubmissions = async (req, res) => {
  try {
    const formId = req.params.formId;
    const submissions = await Submission.find({ form: formId });
    res.json(submissions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  createForm,
  getForms,
  getForm,
  deleteForm,
  submitForm,
  getSubmissions,
};
