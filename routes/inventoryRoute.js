// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const inventoryValidation = require("../utilities/inventory-validation");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:id", invController.getVehicleDetail);
router.get("/inv", invController.buildInvManagement);

// GET route to render the Add New Classification form
router.get("/add-classification", invController.buildAddClassification);

// Route to handle add-classification form submission
router.post(
  "/add-classification",
  inventoryValidation.classificationRules(),
  inventoryValidation.checkClassificationData,
  invController.addClassification
);

// Route to render Add New Inventory view
router.get("/add-inventory", invController.buildAddInventory);

// Route to handle add-inventory form submission
router.post(
  "/add-inventory",
  inventoryValidation.inventoryRules(),
  inventoryValidation.checkInventoryData,
  invController.addInventory
);

//Get inventory for AJAC Route
router.get(
  "/getInventory/:classification_id",
  utilities.handleError(invController.getInventoryJSON)
);

module.exports = router;
