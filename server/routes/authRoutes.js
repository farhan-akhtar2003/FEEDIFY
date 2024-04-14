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
  getSubmissions,
} = require("../controllers/authController");

// Middleware for CORS
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Routes
router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);

// Form routes
router.post("/forms", createForm); // Route for creating a form
router.get("/forms", getForms); // Route for fetching all forms
router.get("/forms/:formId", getForm); // Route for fetching a single form
router.delete("/forms/:formId", deleteForm); // Route for deleting a form
router.post("/forms/:formId/submissions", submitForm); // Route for submitting a form
router.get("/forms/submissions", getSubmissions); // Route for fetching submissions

module.exports = router;
