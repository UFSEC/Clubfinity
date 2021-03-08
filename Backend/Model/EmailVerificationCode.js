const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  code: String,
  expirationTimestamp: {
    type: Date,
    set: (dt) => {
      if (dt instanceof DateTime) {
        return dt.toJSDate();
      }

      return new Date(dt);
    },
    get: (d) => DateTime.fromJSDate(d),
  },
});

exports.Model = mongoose.model('EmailVerificationCode', Schema);
