const {
  validationResult,
  body,
  param,
  query,
} = require('express-validator');
const { DateTime } = require('luxon');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const emailVerificationCodeDAO = require('../DAO/EmailVerificationCodeDAO');
const { generateRandomCode } = require('../util/authUtil');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');
const { getLimitedUserData } = require('../util/userUtil');
const {
  validateName,
  validatePassword,
  validateUsername,
  validateYear,
} = require('../util/Validations/Validations');

const validateData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

// Submit registration ->
// POST /user - create inactive user, send email

// UI
// registration screen - (recieves create user respose) -> code verification page ->
// user inputs code ->
// if correct -> redirect home
// otherwise -> display error messsage

// TODO:
// Create frontend screen for validating code
// When registering with same email as inactive user:
//    Delete previous emailVerificationCodes
//    Update previous user with new information
// When a user is activated, delete the previous emailVerificationCode record
// Disallow all userDAO methods to act on users who are flagged as inactive
// Update seed data with users: active: true
// When
// Fix header issue

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
  const { code: codeAttempt, userId } = req.body;

  const databaseCodeRecord = await emailVerificationCodeDAO.get(userId);

  if (databaseCodeRecord.expirationTimestamp < DateTime.local()) {
    throw new Error('Verification code expired');
  } else if (codeAttempt !== databaseCodeRecord.code) {
    throw new Error('Invalid verification code');
  }

  return await userDAO.update(userId, { active: true });
});

exports.get = async (req, res) => catchErrors(res, async () => {
  const user = await userDAO.get(req.userId);
  return getLimitedUserData(user);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  await userDAO.update(req.userId, req.body);
});

exports.updatePushToken = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  await userDAO.update(req.userId, req.query);
});

exports.updateClubFollowingState = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  const { id: clubId } = req.params;
  const { follow } = req.query;
  const user = await userDAO.get(req.userId);
  switch (follow) {
    case 'true':
      if (!user.clubs.some((club) => club._id.toString() === clubId)) {
        user.clubs.push(clubId);
      }
      return getLimitedUserData(await userDAO.update(req.userId, user));
    case 'false':
      user.clubs.forEach((club, index, clubs) => {
        if (club._id.toString() === clubId) clubs.splice(index, 1);
      });
      return getLimitedUserData(await userDAO.update(req.userId, user));
    default:
      throw new Error(`Invalid value for follow: ${follow}`);
  }
});

async function validateClubId(clubId) {
  const clubExists = await clubDAO.exists(clubId);
  if (!clubExists) {
    throw new Error('Invalid Club ID. Club does not exist.');
  }
  return clubExists;
}

exports.validate = (type) => {
  const baseUserInfo = [
    body('name.first', 'First name does not exist')
      .exists()
      .custom(validateName),
    body('name.last', 'Last name does not exist').exists().custom(validateName),
    body('major', 'Major does not exist or is invalid').exists(),
    body('year', 'Year does not exist or is invalid')
      .exists()
      .custom((year) => validateYear(year)),
  ];
  switch (type) {
    case 'validateBaseUserInfo': {
      return baseUserInfo;
    }
    case 'validateFullUserInfo': {
      return [
        ...baseUserInfo,
        body('email', 'Email does not exist or is invalid')
          .exists()
          .isEmail()
          .contains('@ufl.edu'),
        body('username', 'Username does not exist')
          .exists()
          .custom((username) => validateUsername(username)),
        body('password', 'Password does not exist')
          .exists()
          .custom((password) => validatePassword(password)),
      ];
    }
    case 'validatePushToken': {
      return [query('pushToken', 'push token is missing').exists()];
    }
    case 'validateClubId': {
      return [
        param('id', 'Club id missing')
          .exists()
          .custom(async (clubId) => {
            await validateClubId(clubId);
          }),
      ];
    }
    default: {
      throw new Error('Invalid validator');
    }
  }
};
