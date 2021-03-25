const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
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
});

exports.Model = mongoose.model('UserSettings', Schema);
