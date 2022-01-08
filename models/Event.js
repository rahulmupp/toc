const eventsCollection = require("../db").db().collection("events");

let Event = function (data, id) {
  this.id = id;
  this.data = data;
  this.errors = [];
};

Event.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save event to database only if there are no errors
      eventsCollection
        .insertOne(this.data)
        .then(() => {
          // Resolve only once post is inserted into DB
          resolve();
        })
        .catch(() => {
          // Display message if there is an issue with event.
          this.errors.push("Try again later");
          reject(this.errors);
        });
    } else {
      // Reject promise if there are errors
    }
  });
};

Event.prototype.cleanUp = function () {
  this.data = {
    name: this.data.name,
    email: this.data.email,
    phone: this.data.phone,
    address: this.data.address,
    date: this.data.date,
    time: this.data.time,
    desc: this.data.desc,
  };
};

Event.prototype.validate = function () {
  if (this.data.name == "") {
    this.errors.push("Name cannot be blank.");
  }

  if (this.data.email == "") {
    this.errors.push("E-mail cannot be blank.");
  }

  if (this.data.phone == "") {
    this.errors.push("Phone number cannot be blank.");
  }

  if (this.data.address == "") {
    this.errors.push("Address cannot be blank.");
  }

  if (this.data.date == "") {
    this.errors.push("You must select a date.");
  }

  if (this.data.time == "") {
    this.errors.push("You must select a time");
  }

  if (this.data.desc == "") {
    this.errors.push("Your event must have a description.");
  }
};

module.exports = Event;
