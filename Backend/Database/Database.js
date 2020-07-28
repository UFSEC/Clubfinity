const mongoose = require('mongoose');
const config = require('../Config/config');

const url = config.database;

// Events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose database connection open to ${url}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

exports.connect = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

exports.disconnect = () => {
  mongoose.disconnect();
};
