//Account controller

const utilities = require("../utilities");
const accountModel = require("../models/account-model");

//deliver the login page

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

/* **************************************** *
 * Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
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

/* **************************************** *
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you're registered ${account_firstname}. Please log in.`
    );
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
}

module.exports = {
  buildLogin,
  processLogin,
  buildRegister,
  registerAccount,
};
