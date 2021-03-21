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

async function sendEmailVerificationEmail(user, verificationCode) {
  await global.emailService.send(
    user.email,
    'Clubfinity Email Verification',
    `
Hello ${user.name.first} ${user.name.last},

Thanks for joining Clubfinity!

Here is your email verification code:

${verificationCode}
    `,
  );
}

exports.register = (req, res) => catchErrors(res, async () => {
  validateData(req);

  const { email } = req.body;

  if (await userDAO.emailTakenByInactiveUser(email)) {
    const user = await userDAO.getByEmail(email);

    await userDAO.delete(user._id);
    await emailVerificationCodeDAO.delete(user._id);
  }

  const user = await userDAO.create(req.body);

  const code = generateRandomCode();
  await emailVerificationCodeDAO.create({
    user: user._id,
    code,
    expirationTimestamp: DateTime.local().plus({ minutes: 15 }),
  });

  await sendEmailVerificationEmail(user, code);

  return getLimitedUserData(user);
});

exports.resendEmailVerificationCode = (req, res) => catchErrors(res, async () => {
  const { userId } = req.body;

  const user = await userDAO.get(userId);
  const emailVerificationCode = await emailVerificationCodeDAO.get(userId);

  await sendEmailVerificationEmail(user, emailVerificationCode.code);
});

exports.verifyEmailCode = (req, res) => catchErrors(res, async () => {
  const { code: codeAttempt, userId } = req.body;

  const databaseCodeRecord = await emailVerificationCodeDAO.get(userId);

  if (databaseCodeRecord.expirationTimestamp < DateTime.local()) {
    throw new Error('Verification code expired');
  }

  if (codeAttempt !== databaseCodeRecord.code) {
    throw new Error('Invalid verification code');
  }

  await emailVerificationCodeDAO.delete(userId);

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

async function validateEmailNotTaken(email) {
  if (await userDAO.emailTakenByActiveUser(email)) {
    throw new Error('Email is already in use');
  }
}

async function validateUsernameNotTaken(username) {
  if (await userDAO.usernameTakenByActiveUser(username)) {
    throw new Error('Username is already in use');
  }
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
    // This is required to prevent users from modifying their own active status
    body('active', 'Cannot set active flag')
      .not()
      .exists(),
  ];
  switch (type) {
    case 'validateBaseUserInfo': {
      return baseUserInfo;
    }
    case 'validateFullUserInfo': {
      return [
        ...baseUserInfo,
        body('email', 'Email not given, invalid, or already exists')
          .exists()
          .isEmail()
          .contains('@ufl.edu')
          .custom(async (email) => {
            await validateEmailNotTaken(email);
          }),
        body('username', 'Username not given, invalid, or already exists')
          .exists()
          .custom((username) => validateUsername(username))
          .custom(async (username) => {
            await validateUsernameNotTaken(username);
          }),
        body('password', 'Password not given')
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
