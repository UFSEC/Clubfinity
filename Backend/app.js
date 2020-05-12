require('dotenv').config()
require("./Auth/passport");
const express = require("express");
const userRoute = require("./Routes/UserRoute");
const eventRoute = require("./Routes/EventRoute");
const clubRoute = require("./Routes/ClubRoute");
const authRoute = require("./Routes/AuthRoutes");
const config = require("./Config/config.js");
const database = require("./Database/Database.js");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/club", clubRoute);
app.use("/auth", authRoute);

database.connect();

const server = app.listen(config.port, () => {
  console.log(`Now listening on port ${config.port}`);
});

function stop() {
  console.log('stopping');
  server.close();
  database.disconnect();
}

module.exports = app;
module.exports.stop = stop;
