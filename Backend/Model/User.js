const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: { first: String, last: String },
  major: String,
  year: Number,
  username: String,
  email: String,
  pushToken: String,
  password: { hash: String, salt: String },
  clubs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  }],
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSettings',
  },
});

exports.Model = mongoose.model('User', Schema);
