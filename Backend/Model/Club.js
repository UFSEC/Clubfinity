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
});

exports.Model = mongoose.model("Club", Schema);
