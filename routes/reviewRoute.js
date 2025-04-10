const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const utilities = require('../utilities');
const reviewValidation = require('../utilities/review-validation');

// GET route to fetch all reviews for a specific vehicle
router.get('/reviews/:vehicle_id', reviewController.getReviewsByVehicleId);

// POST route to submit a new review - requires authentication and validation
router.post('/reviews', 
  utilities.checkLogin, 
  reviewValidation.validateReview, 
  reviewController.addReview
);

module.exports = router;