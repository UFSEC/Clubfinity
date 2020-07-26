const express = require('express');

const router = express.Router();
const LoginStrategy = require('../Auth/login.js');

router.post('/login', LoginStrategy.authenticate);

module.exports = router;
