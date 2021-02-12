const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  date: {
    type: Date,
    set: (dt) => {
      if (dt instanceof DateTime) {
        return dt.toJSDate();
      }

      return new Date(dt);
    },
    get: (d) => DateTime.fromJSDate(d),
  },
  goingUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  uninterestedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  interestedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

exports.Model = mongoose.model('Event', Schema);
