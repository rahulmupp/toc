// Routes for User stuff

const User = require("../models/User");

// Handling user registration
exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  req.session.user = { name: user.data.name, email: user.data.email };
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
      req.session.user = { name: user.data.name, email: user.data.email };
      req.session.save(function () {
        res.redirect("/dashboard");
      });
    })
    .catch(function (err) {
      res.send(err);
    });
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
    res.render("dashboard", {
      name: req.session.user.name,
      email: req.session.user.email,
    });
  } else {
    res.redirect("/login");
  }
};

// Routes for Event stuff

exports.post = function (req, res) {
  if (req.session.user) {
    res.render("post");
  } else {
    res.redirect("/login");
  }
};

exports.host = function (req, res) {
  if (req.session.user) {
    res.render("create-event");
  } else {
    res.redirect("/login");
  }
};
