const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String,
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  facebookLink: String,
  instagramLink: String,
  slackLink: String,
  description: String,
  category: String,
  thumbnailUrl: String,
  tags: [{
    type: String,
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
});

exports.Model = mongoose.model('Club', Schema);
