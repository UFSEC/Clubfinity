const userDAO = require("../DAO/UserDAO");
const { validationResult, body } = require("express-validator");
const { ValidationError } = require( '../util/exceptions');
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
  return userDAO.get(req.userId);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateUserData(req);

  return userDAO.update(req.userId, req.body);
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
  }
};

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
