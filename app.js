// Import required dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

// Require the authentication middleware
const checkJWT = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();

// Use cookie-parser middleware so that req.cookies is populated
app.use(cookieParser());

// Use the auth middleware globally so that every request gets the loggedin flag
app.use(checkJWT);

// Set up view engine (assuming EJS is being used based on header.ejs)
app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static('public'));

// Routes will be defined here
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app
module.exports = app;