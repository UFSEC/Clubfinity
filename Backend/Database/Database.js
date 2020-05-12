const mongoose = require("mongoose");
const config = require("../Config/config");

console.log(config)

const url =
  "mongodb://" +
  config.database.host +
  ":" +
  config.database.port +
  "/" +
  config.database.database;

// Events
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + url);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

exports.connect = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

exports.disconnect = () => {
  mongoose.disconnect();
}
