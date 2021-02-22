const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  remoteNotifications: String
});

exports.Model = mongoose.model('UserSettings', Schema);
