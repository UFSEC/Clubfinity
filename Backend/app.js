const express = require("express");
const userRoute = require("./Routes/UserRoute");
const eventRoute = require("./Routes/EventRoute");
const clubRoute = require("./Routes/ClubRoute");
const authRoute = require("./Routes/AuthRoutes");
const config = require("./Config/config.json");
const database = require("./Database/Database.js");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./Auth/passport");

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api/club", clubRoute);
app.use("/auth", authRoute);

database.connect();

app.listen(config.port, "localhost", () => {
  console.log(`Now listening on port ${config.port}`);
});

module.exports = app;
