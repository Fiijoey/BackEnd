const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities");
const reviewValidation = require("../utilities/review-validation");

// Apply middleware to parse incoming request bodies (if not already applied in app.js)
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route to fetch reviews for a specific vehicle
router.get("/reviews/:inv_id", reviewController.getVehicleReviews);

// Route to submit a new review with authentication and validation
router.post(
  "/add", // Changed from "/reviews/add" to "/add" to match the form action
  utilities.checkLogin, // Check if user is logged in
  reviewValidation.reviewRules(), // Apply validation rules
  reviewValidation.checkValidationResults, // Handle validation errors
  reviewController.addReview // Proceed to controller if validation passes
);

module.exports = router;
