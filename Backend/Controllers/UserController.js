const userDAO = require("../DAO/UserDAO");
const { validationResult, body } = require("express-validator");
const { ValidationError, NotFoundError } = require( '../util/exceptions');

const validateUserData = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError(errors.array());
};

const catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message});
    }
  }
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
        body("major", "Major does not exist or is invalid")
          .exists()
          .custom(major => validateMajor(major)),
        body("year", "Year does not exist or is invalid")
          .exists()
          .custom(year => validateYear(year)),
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

// Major cannot be an empty string
function validateMajor(major) {
  if (major === '') {
    throw new Error("Major cannot be empty");
  }
  return true;
}

// Year cannot be an empty string
// Year must be a number
function validateYear(year) {
  if (year === '') {
    throw new Error("Year cannot be empty");
  }
  else if(isNaN(year)) {
    throw new Error("Year must be a number");
  }
  return true;
}