const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String,
  location: String,
  majorOfInterest: String,
  description: String,
  date: {
    type: Date,
    set: (dt) => dt.toJSDate(),
    get: (d) => DateTime.fromJSDate(d),
  },
  goingUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

exports.Model = mongoose.model('Event', Schema);
