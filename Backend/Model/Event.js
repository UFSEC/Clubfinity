const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  club_id: Number,
  club_name: String,
  location: String,
  major_of_interest: String,
  description: String,
  date: String
});

exports.Model = mongoose.model("Event", Schema);
