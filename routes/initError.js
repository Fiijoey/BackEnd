const express = require('express');
const router = express.Router();

router.get('/trigger-error', (req, res, next) => {
  const error = new Error('Intentional error triggered.');
  error.status = 500;
  next(error); // Pass the error to middleware
});

module.exports = router;
