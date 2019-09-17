const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  president_name: String,
  major_of_interest: String,
  email: String,
  password: String,
  events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
  }]
});

exports.Model = mongoose.model("Club", Schema);
