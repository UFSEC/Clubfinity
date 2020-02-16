const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  admins:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  facebook_link: String,
  description: String,
  category: String,
  events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
  }]
});

exports.Model = mongoose.model("Club", Schema);
