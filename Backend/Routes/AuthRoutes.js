const express = require('express');

const router = express.Router();
const LoginStrategy = require('../Auth/login.js');
const userController = require('../Controllers/UserController');
const authController = require('../Controllers/AuthController');

router.post('/login', LoginStrategy.authenticate);
router.post('/register', userController.validate('validateFullUserInfo'), authController.register);

module.exports = router;
