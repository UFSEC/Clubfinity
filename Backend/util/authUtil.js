const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

const config = require('../Config/config');

const PBKDF2_ITERATIONS = 10000;

const EMAIL_VERIFICATION_CODE_LENGTH = 6;

exports.tokanizeUser = (user) => jwt.sign({ id: user.id }, config.jwtSecret);

function generateHash(password, salt) {
  return pbkdf2.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 128).toString();
}

exports.hashPassword = (password) => {
  const salt = crypto.randomBytes(128).toString('base64');

  const hash = generateHash(password, salt);

  return {
    salt,
    hash,
  };
};

exports.validatePasswordHash = (user, passwordAttempt) => {
  const { hash, salt } = user.password;

  return hash === generateHash(passwordAttempt, salt);
};

exports.generateRandomCode = () => {
  const possible = '0123456789';
  let code = '';
  for (let i = 0; i < EMAIL_VERIFICATION_CODE_LENGTH; i += 1) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
};
