const {
  validationResult, body, param, query,
} = require('express-validator');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
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

exports.get = async (req, res) => catchErrors(res, async () => {
  const user = await userDAO.get(req.userId);
  return getLimitedUserData(user);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  await userDAO.update(req.userId, req.body);
});

exports.updateUserSettings = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  if (Object.keys(req.query).length === 0) {
    throw new ValidationError([{
      value: '',
      param: '',
      msg: 'No parameters given',
      location: 'query',
    }]);
  }

  const settings = {
    settings: req.query
  }

  await userDAO.update(req.userId, settings);
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

exports.create = async (req, res) => catchErrors(res, async () => {
  validateData(req);
  req.body.clubs = [];
  return await userDAO.create(req.body);
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
    body('name.first', 'First name does not exist').exists().custom(validateName),
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
          .isEmail().contains('@ufl.edu'),
        body('username', 'Username does not exist')
          .exists()
          .custom((username) => validateUsername(username)),
        body('password', 'Password does not exist')
          .exists()
          .custom((password) => validatePassword(password)),
      ];
    }
    case 'validateUserSettings': {
      return [
        query('eventNotifications', 'Invalid event notifications setting').optional().isIn(['enabled', 'disabled']),
        query('announcementNotifications', 'Invalid announcement notifications setting').optional().isIn(['enabled', 'disabled']),
        query('eventReminderNotifications', 'Invalid event reminder notifications setting').optional().isIn(['never', '24', '12', '6', '3', '1']),
      ];
    }
    case 'validatePushToken': {
      return [
        query('pushToken', 'push token is missing').exists(),
      ];
    }
    case 'validateClubId': {
      return [
        param('id', 'Club id missing').exists()
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
