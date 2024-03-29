require('dotenv').config();
require('./Auth/passport');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const userRoute = require('./Routes/UserRoute');
const eventRoute = require('./Routes/EventRoute');
const clubRoute = require('./Routes/ClubRoute');
const announcementRoutes = require('./Routes/AnnouncementRoutes');
const authRoute = require('./Routes/AuthRoutes');
const config = require('./Config/config.js');
const database = require('./Database/Database.js');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);
app.use('/api/clubs', clubRoute);
app.use('/api/announcements', announcementRoutes);
app.use('/auth', authRoute);

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
