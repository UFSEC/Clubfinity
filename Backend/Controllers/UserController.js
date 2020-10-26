const { validationResult, body, query } = require('express-validator');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');
const {
  validateName, validatePassword, validateUsername, validateYear,
} = require('../util/Validations/Validations.js');

const validateData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

exports.getAll = async (req, res) => catchErrors(res, async () => userDAO.getAll());

exports.get = async (req, res) => catchErrors(res, async () => userDAO.get(req.params.id));

exports.update = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  return userDAO.update(req.userId, req.body);
});

exports.followClub = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  const { clubId } = req.query;
  const updatedUser = await userDAO.get(req.userId);
  if (updatedUser.clubs.some((club) => club._id.toString() === clubId)) return updatedUser;

  updatedUser.clubs.push(clubId);
  return userDAO.update(req.userId, updatedUser);
});

exports.unfollowClub = async (req, res) => catchErrors(res, async () => {
  validateData(req);

  const { clubId } = req.query;
  const user = await userDAO.get(req.userId);

  user.clubs.forEach((club, index, clubs) => {
    if (club._id.toString() === clubId) {
      clubs.splice(index, 1);
    }
  });
  return userDAO.update(req.userId, user);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateData(req);
  req.body.clubs = [];
  return userDAO.create(req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => userDAO.delete(req.userId));

// Club ID must belong to a club that exists in FB
async function validateClubId(clubId) {
  const clubExists = await clubDAO.exists(clubId);
  if (!clubExists) {
    throw new Error('Invalid Club ID. Club does not exist.');
  }
  return clubExists;
}

// functions imported from util/Validation/Validations.js
exports.validate = (type) => {
  switch (type) {
    case 'validateUserInfo': {
      return [
        body('name.first', 'First name does not exist').exists().custom(validateName),
        body('name.last', 'Last name does not exist').exists().custom(validateName),
        body('major', 'Major does not exist or is invalid').exists(),
        body('year', 'Year does not exist or is invalid')
          .exists()
          .custom((year) => validateYear(year)),
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
    case 'validateClubId': {
      return [
        query('clubId', 'Club Id missing').exists()
          .custom(async (clubId) => { await validateClubId(clubId); }),
      ];
    }
    default: {
      throw new Error('Invalid validator');
    }
  }
};
