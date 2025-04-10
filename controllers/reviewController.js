/**
 * Review Controller
 * Handles all review-related operations including fetching and adding vehicle reviews
 */

const reviewModel = require('../models/review-model');
const { validateReview } = require('../utilities/review-validation');
const utilities = require('../utilities/');

/**
 * Get reviews for a specific vehicle
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getVehicleReviews(req, res, next) {
  try {
    // Extract vehicle ID from request parameters
    const vehicleId = req.params.vehicleId;
    
    // Check if vehicle ID is provided
    if (!vehicleId) {
      req.flash("notice", "Invalid vehicle ID");
      return res.redirect("/inventory");
    }
    
    // Fetch reviews from the model
    const reviews = await reviewModel.getReviewsByVehicleId(vehicleId);
    
    // Return the reviews as JSON if it's an API request
    if (req.originalUrl.includes('/api')) {
      return res.json(reviews);
    }
    
    // Otherwise, pass the reviews to the next middleware or view
    req.reviews = reviews;
    next();
  } catch (error) {
    console.error("Error in getVehicleReviews:", error);
    
    // Handle API requests
    if (req.originalUrl.includes('/api')) {
      return res.status(500).json({ 
        message: "Failed to retrieve reviews", 
        error: error.message 
      });
    }
    
    // Handle web requests
    req.flash("notice", "Failed to retrieve reviews");
    next(error);
  }
}

/**
 * Add a new review for a vehicle
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function addReview(req, res, next) {
  try {
    // Check if user is logged in
    if (!req.session.loggedin) {
      // Handle API requests
      if (req.originalUrl.includes('/api')) {
        return res.status(401).json({ 
          message: "You must be logged in to add a review" 
        });
      }
      
      // Handle web requests
      req.flash("notice", "You must be logged in to add a review");
      return res.redirect("/account/login");
    }
    
    // Extract review data from request body
    const { vehicleId, rating, reviewText } = req.body;
    const account_id = req.session.account_id;
    
    // Validate review data
    const validationResult = validateReview({ vehicleId, rating, reviewText });
    
    if (!validationResult.valid) {
      // Handle API requests
      if (req.originalUrl.includes('/api')) {
        return res.status(400).json({ 
          message: "Invalid review data", 
          errors: validationResult.errors 
        });
      }
      
      // Handle web requests
      req.flash("notice", validationResult.errors.join(", "));
      return res.redirect(`/inventory/detail/${vehicleId}`);
    }
    
    // Prepare review data for insertion
    const reviewData = {
      account_id,
      vehicle_id: vehicleId,
      rating,
      review_text: reviewText,
      review_date: new Date()
    };
    
    // Insert review into database
    const result = await reviewModel.insertReview(reviewData);
    
    // Handle successful insertion
    if (result) {
      // Handle API requests
      if (req.originalUrl.includes('/api')) {
        return res.status(201).json({ 
          message: "Review added successfully", 
          reviewId: result 
        });
      }
      
      // Handle web requests
      req.flash("notice", "Review added successfully");
      return res.redirect(`/inventory/detail/${vehicleId}`);
    } else {
      throw new Error("Failed to add review");
    }
  } catch (error) {
    console.error("Error in addReview:", error);
    
    // Handle API requests
    if (req.originalUrl.includes('/api')) {
      return res.status(500).json({ 
        message: "Failed to add review", 
        error: error.message 
      });
    }
    
    // Handle web requests
    req.flash("notice", "Failed to add review");
    next(error);
  }
}

module.exports = {
  getVehicleReviews,
  addReview
};