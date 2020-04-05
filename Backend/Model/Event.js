const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  location: String,
  major_of_interest: String,
  description: String,
  date: Date,
  goingUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

exports.Model = mongoose.model("Event", Schema);
