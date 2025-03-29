//Account controller

const utilities = require("../utilities");

//deliver the login page

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

async function processLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    // For demonstration purposes, validate against static credentials
    if (email === "test@example.com" && password === "password123") {
      // Set the logged-in user in session
      req.session.user = { email };
      // Redirect to home page or dashboard
      res.redirect("/");
    } else {
      // Flash error message and redirect back to login
      req.flash("error", "Invalid email or password");
      res.redirect("/account/login");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildLogin,
  processLogin,
};
