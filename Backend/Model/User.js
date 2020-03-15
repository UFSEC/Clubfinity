const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { first: String, last: String },
  major: String,
  year: String,
  username: String,
  email: String,
  password: String,
  clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
  }]
});

exports.Model = mongoose.model("User", Schema);