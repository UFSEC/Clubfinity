const jwt = require('jsonwebtoken');
const config = require('../Config/config');

exports.tokanizeUser = (user) => jwt.sign({ id: user.id }, config.jwtSecret);
