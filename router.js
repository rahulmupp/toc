// Required imports
const express = require("express");
const router = express.Router();

// Import User Controller
const userController = require("./controllers/userController");
// Import Event Controller
const eventController = require("./controllers/eventController")

// Routing for landing page
router.get("/", userController.home);

// Routing for registration page
router.get("/register", function (req, res) {
  res.render("signUp");
});

router.post("/register", userController.register);

// Routing for login page
router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", userController.login);

// Routing for logout
router.post("/logout", userController.logout);

// Routing for dashboard
router.get("/dashboard", userController.dashboard);

router.get("/host", userController.isLoggedIn, eventController.createEvent);

// Export site routing
module.exports = router;
