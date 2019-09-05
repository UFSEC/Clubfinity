var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var userDAO = require('../DAO/UserDAO');

router.use(flash());
router.use(session({secret:'Inuyasha'}));
router.use(passport.initialize());
router.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// // used to deserialize the user
// passport.deserializeUser(function(user, done) {
//     console.log(user);
//     userDAO.getUser(user, function(result) {
//         done(null,result);
//     });
// });
passport.use(new LocalStrategy((username, password, done)=>{
    userDAO.getUser(username,(result)=>{
        console.log(password);
        if(result&&result[0].password===password){
            console.log('success');
            done(null,username,{message: 'Login Successful!'});
        }
        else{
            console.log('failure');
            done(null,false,{message: 'Invalid username or password.'});
        }
    });
}));
router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;