var express = require('express');
var userRoute = require('./Routes/UserRoute');
var authRoute = require('./Routes/AuthRoutes');
const config = require('./Config/config.json')
const database = require('./Database/Database.js')

var app = express();

const port = 8080;

app.use('/api',userRoute);
app.use('/auth',authRoute);
database.connect();

app.listen(config.port,'localhost',()=>{
    console.log(`Now listening on port ${config.port}`);
});
