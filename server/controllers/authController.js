//FEEDIFY>SERVER>CONTROLLERS>authController.js
const User = require("../models/user");
const Form = require("../models/form"); // Import the Form model
const Submission = require("../models/submission"); // Import the Submission model
const { comparePassword, hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
//const fetch = await import("node-fetch");

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

const getProfile = async (req, res) => {
  const { token } = await req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // Include userType in the response
      res.json({ user });
    });
  } else {
    res.json(null);
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    await res.clearCookie("token");

    // Respond with success message
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to create a form
const createForm = async (req, res) => {
  try {
    const {
      formId,
      title,
      endMessage,
      expiration,
      fields,
      faculty,
      accessibleTo,
      createdAt,
    } = req.body;
    const form = await Form.create({
      formId, // Include formId in the creation
      title,
      endMessage,
      expiration,
      fields,
      faculty,
      accessibleTo,
      createdAt,
    });
    //console.log(form);
    res.status(201).json({ message: "Form created successfully", form });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      res.status(400).json({ error: "Duplicate formId detected" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Function to fetch forms
// Use Form.find() to fetch all forms from the database.
const getForms = async (req, res) => {
  try {
    const allForms = await Form.find();
    const reversedForms = allForms.reverse();

    res.status(200).json({
      message: "Forms retrieved successfully",
      allForms: reversedForms,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch a single form
const getForm = async (req, res) => {
  try {
    const { formId } = req.params; // Assuming formId is passed as a URL parameter
    const form = await Form.findOne({ formId });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a form
const deleteForm = async (req, res) => {
  try {
    const formId = req.params.formId;

    // Check if there are any submissions associated with the form
    const submissions = await Submission.find({ formID: formId });
    // If there are submissions, delete them first
    if (submissions.length > 0) {
      await Submission.deleteOne({ formID: formId });
    }
    // Then delete the form by its custom formId field
    await Form.deleteOne({ formId: formId });
    res.json({
      message: "Form and associated submissions deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to submit a form
const submitForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { submitableModel, formTitle, studentId } = req.body;

    // // Check if the form exists
    const form = await Form.findOne({ formId: formId });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Check if there's an existing submission for the same form ID and student ID
    let submission = await Submission.findOne({
      formID: formId,
      // "responses.studentID": studentId,
    });

    if (!submission) {
      // If no existing submission, create a new one
      const responses = submitableModel.map((answer) => ({
        quesTitle: answer.title,
        quesType: answer.type,
        response: answer.value,
      }));

      submission = await Submission.create({
        formID: formId,
        formTitle: formTitle,
        responses: [
          {
            studentID: studentId,
            answers: responses,
          },
        ],
      });
    } else {
      // If existing submission found, append new responses to it
      const newResponses = submitableModel.map((answer) => ({
        quesTitle: answer.title,
        quesType: answer.type,
        response: answer.value,
      }));

      submission.responses.push({
        studentID: studentId,
        answers: newResponses,
      });

      await submission.save();
    }

    return res
      .status(201)
      .json({ message: "Form submitted successfully", submission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch submissions for a form
const getOnesubmissions = async (req, res) => {
  try {
    const { formId } = req.params;
    const studentId = req.query.studentID;

    // Find submissions matching the provided formId and studentId
    const submissions = await Submission.findOne({
      formID: formId,
      "responses.studentID": studentId,
    });

    //console.log("submissions", formId,studentId,submissions);
    // If submissions are found, extract the relevant data
    if (submissions) {
      // Filter responses for the specified student ID
      const studentResponses = submissions.responses.find(
        (response) => response.studentID === studentId
      );

      // Extract answer details from the responses
      const answerDetails = studentResponses.answers.map((answer) => ({
        quesTitle: answer.quesTitle,
        quesType: answer.quesType,
        response: answer.response,
      }));

      // Send the extracted answer details as JSON response
      res.json(answerDetails);
    } else {
      // If no submissions are found for the given criteria, return a 404 response
      res.status(404).json({ error: "Submissions not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get ALL multiple submissions for a form
const getAllsubmissions = async (req, res) => {
  try {
    const { formId } = req.params;

    // Find submissions matching the provided formId
    const submissions = await Submission.findOne({
      formID: formId,
    });

    //console.log("getallsubmissions",submissions);
    // If submissions are found, extract the relevant data
    if (submissions) {
      // Extract all responses
      const allResponses = submissions.responses;

      // Extract answer details from all responses
      const answerDetails = allResponses.map((response) => {
        const studentID = response.studentID;
        const answers = response.answers.map((answer) => ({
          quesTitle: answer.quesTitle,
          quesType: answer.quesType,
          response: answer.response,
        }));
        return { studentID, answers };
      });

      // Send the extracted answer details as JSON response
      res.json(answerDetails);
    } else {
      // If no submissions are found for the given criteria, return a 404 response
      res.status(404).json({ error: "Submissions not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get ALL multiple submissions for analysis of form
const getAllcounts = async (req, res) => {
  try {
    const { formId } = req.params;

    // Find submissions matching the provided formId
    const submissions = await Submission.findOne({
      formID: formId,
    });

    //console.log("getAllcounts", submissions);
    // If submissions are found, extract the relevant data
    if (submissions) {
      const allResponses = submissions.responses;

      // Create a map to store accumulated responses for each question
      const accumulatedResponses = {};

      // Extract answer details from all responses
      allResponses.forEach((response) => {
        response.answers.forEach((answer) => {
          const { quesTitle, quesType, response: answerResponse } = answer;

          // If the question type is multi-option, accumulate response counts
          if (quesType.startsWith("multioption")) {
            if (!accumulatedResponses[quesTitle]) {
              accumulatedResponses[quesTitle] = {};
            }
            // Iterate over each option and accumulate the counts
            if (Array.isArray(answerResponse)) {
              answerResponse.forEach((option) => {
                accumulatedResponses[quesTitle][option] =
                  (accumulatedResponses[quesTitle][option] || 0) + 1;
              });
            } else if (typeof answerResponse === "object") {
              Object.entries(answerResponse).forEach(([option, count]) => {
                accumulatedResponses[quesTitle][option] =
                  (accumulatedResponses[quesTitle][option] || 0) + count;
              });
            }
          } else {
            // For other question types, accumulate individual responses
            if (!accumulatedResponses[quesTitle]) {
              accumulatedResponses[quesTitle] = [];
            }
            accumulatedResponses[quesTitle].push(answerResponse);
          }
        });
      });

      // Prepare the final response array
      const finalResponse = Object.entries(accumulatedResponses).map(
        ([quesTitle, response]) => {
          return { quesTitle, response };
        }
      );

      // Send the extracted answer details as JSON response
      res.json(finalResponse);
    } else {
      // If no submissions are found for the given criteria, return a 404 response
      res.status(404).json({ error: "Submissions not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//hugging face model for summarization
const getNlp = async (req, res) => {
  const { inputs } = req.body;
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      // "https://api-inference.huggingface.co/models/philschmid/bart-large-cnn-samsum",

      {
        headers: {
          Authorization: "Bearer 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", // bearer token comes from hugging face
          "Content-Type": "application/json", // Add content type header
        },
        method: "POST",
        body: JSON.stringify({ inputs }),
      }
    );
    const result = await response.json();
    // console.log("3",result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//hugging face model for sentiment analysis
const getSentiment = async (req, res) => {
  const { inputs } = req.body;
  try {
    const response = await fetch(
      // "https://api-inference.huggingface.co/models/avichr/heBERT_sentiment_analysis",
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",

      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify({ inputs }),
      }
    );
    // console.log("2");
    const result = await response.json();
    //console.log("3", result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all students
const allStudents = async (req, res) => {
  try {
    // Find all users with userType 'Student'
    const students = await User.find({ userType: "Student" }).select(
      "-password -_id"
    );
    // Return the list of students
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all Faculties,
const allFaculties = async (req, res) => {
  try {
    // Find all users with userType 'Student'
    const faculties = await User.find({ userType: "Faculty" }).select(
      "-password -_id"
    );
    //console.log(faculties);
    // Return the list of students
    res.status(200).json(faculties);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = allStudents;

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
  getOnesubmissions,
  getAllsubmissions,
  getAllcounts,
  getNlp,
  getSentiment,
  allStudents,
  allFaculties,
};
