const userDAO = require("../DAO/UserDAO");
const clubDAO = require("../DAO/ClubDAO");
const { validationResult, body, param } = require("express-validator");
const { ValidationError, NotFoundError } = require('../util/exceptions');
const { catchErrors } = require('../util/httpUtil');

const validateUserData = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError(errors.array());
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return userDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return userDAO.get(req.params.id);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateUserData(req);

  return userDAO.update(req.userId, req.body);
});

exports.followClub = async (req, res) => catchErrors(res, async () => {
  validateUserData(req);

  const clubId = req.params['clubId'];
  const updatedUser = await userDAO.get(req.userId);

  if (updatedUser.clubs.includes(clubId))
    return updatedUser;

  updatedUser.clubs.push(clubId);
  return userDAO.update(req.userId, updatedUser);
});

exports.unfollowClub = async (req, res) => catchErrors(res, async () => {
  validateUserData(req);

  const clubId = req.params['clubId'];
  const user = await userDAO.get(req.userId);

  const idIndex = user.clubs.indexOf(clubId);

  if (idIndex === -1)
    return user;

  user.clubs.splice(idIndex, 1);
  return userDAO.update(req.userId, user);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateUserData(req);

  return userDAO.create(req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  return userDAO.delete(req.userId);
});

exports.validate = type => {
  switch (type) {
    case "validateUserInfo": {
      return [
        body("name.first", "First name does not exist").exists(),
        body("name.last", "Last name does not exist").exists(),
        body("dob", "Date of birth does not exist")
          .exists()
          .custom(date => validateDate(date)),
        body("email", "Email does not exist or is invalid")
          .exists()
          .isEmail(),
        body("username", "Username does not exist")
          .exists()
          .custom(username => validateUser(username)),
        body("password", "Password does not exist")
          .exists()
          .custom(password => validatePassword(password))
      ];
    }

    case "validateFollow": {
      return [
        param("clubId", "Club Id missing").exists()
          .custom(clubId => validateClubId(clubId))
      ];
    }
  }
};

// Club ID must belong to a club that exists in FB
async function validateClubId(clubId) {
  const clubExists = await clubDAO.exists(clubId);
  if (!clubExists) {
    throw new Error("Invalid Club ID. Club does not exist.")
  }
  return clubExists;
}

// Validating date
// Format must be able to be parsed into Date class
function validateDate(date) {
  if (new Date(date) === "Invalid Date" || isNaN(new Date(date))) {
    throw new Error("Invalid date string");
  }
  return true;
}

// Username must be within 6 and 20 characters
// Username must not contain empty spaces
function validateUser(user) {
  if (user.length < 6) {
    throw new Error("Username is too short (less than 6 characters)");
  }
  if (user.length > 20) {
    throw new Error("Username is too long (more than 20 characters)");
  }
  if (user.indexOf(" ") !== -1) {
    throw new Error("Username contains a space");
  }
  return true;
}

// Password must be longer than 6 characters
function validatePassword(password) {
  if (password.length < 6) {
    throw new Error("Password is too short (less than 6 characters)");
  }
  return true;
}
