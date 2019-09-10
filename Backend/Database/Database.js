const mongoose = require("mongoose");
const config = require("../Config/config.json");

const url =
  "mongodb://" +
  config.development.database.host +
  ":" +
  config.development.database.port +
  "/" +
  config.development.database.database;

// Events
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open to " + url);
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

exports.connect = () => {
  mongoose.connect(url);
};
