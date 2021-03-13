const { DateTime } = require('luxon');
const { validationResult } = require('express-validator');

const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');

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

// Submit registration ->
// POST /user - create inactive user, send email

// UI
// registration screen - (recieves create user respose) -> code verification page ->
// user inputs code ->
// if correct -> redirect home
// otherwise -> display error messsage

// TODO:
// create validate code endpoint
// Create frontend screen for validating code
// In register endpoint, delete inactive users with same email

exports.register = (req, res) => catchErrors(res, async () => {
  validateData(req);
  req.body.clubs = [];
  const user = await userDAO.create(req.body);

  const code = generateRandomCode();
  await emailVerificationCodeDAO.create({
    user: user._id,
    code,
    expirationTimestamp: DateTime.local().plus({ minutes: 15 }),
  });

  await global.emailService.send(
    user.email,
    'Clubfinity Email Verification',
    `
Hello ${user.name.first} ${user.name.last},

Thanks for joining Clubfinity!

Here is your email verification code:

${code}
    `,
  );

  return getLimitedUserData(user);
});

exports.verifyEmailCode = (req, res) => catchErrors(res, async () => {
  const { code : codeAttempt , userId } = req.body;

  const databaseCodeRecord = await emailVerificationCodeDAO.get(userId);

  if (databaseCodeRecord.expirationTimestamp < DateTime.local()) {
    throw new Error('Verification code expired');
  } else if (codeAttempt !== databaseCodeRecord.code) {
    throw new Error('Invalid verification code');
  }

  return await userDAO.update(userId, { active : true })
})
