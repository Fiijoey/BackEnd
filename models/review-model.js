const pool = require('../database/index');
const { logger } = require('../utilities/logger');

/**
 * Review Model - Handles database operations for vehicle reviews
 */

/**
 * Get all reviews for a specific vehicle
 * @param {number} vehicle_id - The ID of the vehicle to get reviews for
 * @returns {Promise<Array>} - Array of review objects
 */
async function getReviewsByVehicleId(vehicle_id) {
  try {
    const sql = `
      SELECT r.*, a.account_firstname, a.account_lastname 
      FROM review r
      JOIN account a ON r.account_id = a.account_id
      WHERE r.vehicle_id = $1
      ORDER BY r.review_date DESC
    `;
    
    const result = await pool.query(sql, [vehicle_id]);
    
    return result.rows;
  } catch (error) {
    logger.error(`Error retrieving reviews for vehicle ${vehicle_id}: ${error.message}`);
    throw new Error(`Unable to get reviews: ${error.message}`);
  }
}

/**
 * Insert a new review into the database
 * @param {Object} reviewData - Object containing review data
 * @param {number} reviewData.vehicle_id - ID of the vehicle being reviewed
 * @param {number} reviewData.account_id - ID of the account submitting the review
 * @param {number} reviewData.rating - Rating value (typically 1-5)
 * @param {string} reviewData.review_text - Text content of the review
 * @returns {Promise<Object>} - The newly created review
 */
async function insertReview(reviewData) {
  try {
    const { vehicle_id, account_id, rating, review_text } = reviewData;
    
    // Validate required fields
    if (!vehicle_id || !account_id || !rating) {
      throw new Error('Missing required review data');
    }
    
    const sql = `
      INSERT INTO review (vehicle_id, account_id, rating, review_text, review_date)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const result = await pool.query(sql, [
      vehicle_id, 
      account_id, 
      rating, 
      review_text || '' // Handle case where review_text might be null
    ]);
    
    return result.rows[0];
  } catch (error) {
    logger.error(`Error inserting review: ${error.message}`);
    throw new Error(`Unable to add review: ${error.message}`);
  }
}

module.exports = {
  getReviewsByVehicleId,
  insertReview
};