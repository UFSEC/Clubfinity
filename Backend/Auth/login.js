const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const config = require("../Config/config.json");

exports.authenticate = (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                error: info.message,
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token = jwt.sign({id: user.id}, config.jwtSecret);
           return res.json({token: token});
        });
    })(req, res);
};
