// Routes for User stuff

const User = require("../models/User");

// Handling user registration
exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  req.session.user = {firstName: user.data.firstName, email: user.data.email, phone: user.data.phone, lastName: user.data.lastName, username: user.data.username, password: user.data.password, whatsApp: user.data.whatsApp, address: user.data.address, city: user.data.city, country: user.data.country};
  req.session.save(function () {
    res.redirect("/dashboard");
  });
};

// Handling user login
exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = {email: user.data.email, _id: user.data._id };
      req.session.save(function () {
        res.redirect("/dashboard");
      });
    })
    .catch(function (err) {
      res.send(err);
    });
};

// Check if user is logged in
exports.isLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // res.send("must be logged in");
    req.session.save(function () {
      res.redirect("/login");
    });
  }
};

// Handling user logout
exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/");
  });
};

// Render landing page
exports.home = function (req, res) {
  res.render("landing");
};

// Render dashboard
exports.dashboard = function (req, res) {
  if (req.session.user) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
};

// Routes for Event stuff
exports.host = function (req, res) {
  if (req.session.user) {
    res.render("create-event");
  } else {
    res.redirect("/login");
  }
};
