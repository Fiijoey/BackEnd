/**
 * Middleware: authMiddleware.js
 * Purpose: Verify JWT token from cookies and set res.locals.loggedin flag
 */

const jwt = require('jsonwebtoken');

// Note: Make sure to install and configure cookie-parser in your app

function checkJWT(req, res, next) {
  // Retrieve JWT token from cookies (assuming cookie name is 'jwt')
  const token = req.cookies && req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // If token verification fails, set loggedin to false
        res.locals.loggedin = false;
      } else {
        // Token is valid, user is logged in
        res.locals.loggedin = true;
        // Optionally, you can store user data in res.locals as well, e.g.:
        // res.locals.user = decoded;
      }
      return next();
    });
  } else {
    // No token provided
    res.locals.loggedin = false;
    return next();
  }
}

module.exports = checkJWT;