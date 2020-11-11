const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: String,
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
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

exports.Model = mongoose.model('Announcement', Schema);
