const { DateTime } = require('luxon');

const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');
const { validationResult } = require('express-validator');
// const config = require('../Config/config');

const userDAO = require('../DAO/UserDAO');
const emailVerificationCodeDAO = require('../DAO/EmailVerificationCodeDAO');
const { getLimitedUserData } = require('../util/userUtil');

const EMAIL_VERIFICATION_CODE_LENGTH = 6;

const validateData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

const generateRandomCode = () => {
  const possible = '0123456789';
  let code = '';
  for (let i = 0; i < EMAIL_VERIFICATION_CODE_LENGTH; i += 1) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
};

exports.register = (req, res) => catchErrors(res, async () => {
  validateData(req);
  req.body.clubs = [];
  const user = await userDAO.create(req.body);

  await emailVerificationCodeDAO.create({
    user: user._id,
    code: generateRandomCode(),
    expirationTimestamp: DateTime.local().plus({ minutes: 15 }),
  });

  return getLimitedUserData(user);
});
