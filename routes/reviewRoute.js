const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities");
const reviewValidation = require("../utilities/review-validation");

// GET route to fetch all reviews for a specific vehicle
router.get("/reviews/:vehicle_id", reviewController.getVehicleReviews);

// POST route to submit a new review - requires authentication and validation
router.post(
  "/",
  utilities.checkLogin,
  reviewValidation.reviewRules(),
  reviewValidation.checkValidationResults,
  reviewController.addReview
);

module.exports = router;
