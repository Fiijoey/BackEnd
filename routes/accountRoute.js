//Needed Resources
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidator = require("../utilities/account-validation");

//Delievering the routes
router.get("/", utilities.handleError(accountController.buildAccountHome));
router.get("/login", utilities.handleError(accountController.buildLogin));
router.post("/login", utilities.handleError(accountController.accountLogin));
router.get("/register", utilities.handleError(accountController.buildRegister));
router.post(
  "/register",
  regValidator.registrationRules(),
  regValidator.checkRegData,
  utilities.handleError(accountController.registerAccount)
);



module.exports = router;
