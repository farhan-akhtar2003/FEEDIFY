const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
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
} = require("../controllers/authController");

// Middleware for CORS
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // NEED CHANGES
  })
);

// Routes
router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);

// Form routes
router.post("/createForms", createForm); // Route for creating a form
router.get("/forms", getForms); // Route for fetching all forms
router.get("/forms/fill/:formId", getForm); // Route for fetching a single form

router.delete("/forms/:formId", deleteForm); // Route for deleting a form

router.post("/forms/fill/:formId/submissions", submitForm); // Route for submitting a form

router.get("/forms/submissions/:formId", getOnesubmissions);

router.get("/forms/submission/:formId", getAllsubmissions);

//for analysis
router.get("/forms/analysis/:formId", getAllcounts);

//for huggging face model
router.post("/nlpsummarizer", getNlp);
router.post("/nlpsentiment", getSentiment);

//to get all students
router.get("/students", allStudents);

//to get all students
router.get("/faculties", allFaculties);

module.exports = router;
