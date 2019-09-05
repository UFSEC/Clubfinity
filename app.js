var express = require('express');
var userRoute = require('./Routes/UserRoute');
var authRoute = require('./Routes/AuthRoutes');

var app = express();

const port = 8080;

app.use('/api',userRoute);
app.use('/auth',authRoute);

app.listen(port,'localhost',()=>{
    console.log(`Now listening on port ${port}`);
});