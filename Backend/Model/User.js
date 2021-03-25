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
    announcementNotifications: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
    eventNotifications: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
    eventReminderNotifications: {
      type: String,
      enum: ['never', '24', '12', '6', '3', '1'],
      default: '1',
    },
  },
});

exports.Model = mongoose.model('User', Schema);
