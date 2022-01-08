// Import Event Model
const Event = require("../models/Event");

exports.adminCreateEvent = function (req, res) {
  res.render("create-event");
};

exports.create = function (req, res) {
  let event = new Event(req.body);
  event
    .create()
    .then(function () {
      res.send("event created");
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.viewEvent = function (req, res) {
  res.render("post.ejs");
};
