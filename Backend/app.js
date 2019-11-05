const express = require("express");
const userRoute = require("./Routes/UserRoute");
const authRoute = require("./Routes/AuthRoutes");
const config = require("./Config/config.json");
const database = require("./Database/Database.js");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use("/api", userRoute);
app.use("/auth", authRoute);
database.connect();

app.listen(config.port, "localhost", () => {
  console.log(`Now listening on port ${config.port}`);
});

module.exports = app;
