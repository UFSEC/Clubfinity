const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    set: (dt) => dt.toJSDate(),
    get: (d) => DateTime.fromJSDate(d),
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

exports.Model = mongoose.model('Announcement', Schema);
