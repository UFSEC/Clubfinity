const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { first: String, last: String },
  dob: String,
  username: String,
  email: String,
  password: String
});

exports.Model = mongoose.model("User", Schema);
