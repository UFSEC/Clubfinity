const userDAO = require("../DAO/UserDAO");
const { validationResult, param, query } = require("express-validator/check");

exports.getAll = (req, res) => {
  console.log("API GET request called for all users");
  userDAO.getAllUsers(result => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  console.log(`API GET request called for ${req.params.username}`);
  userDAO.getUser(req.params.username, result => {
    if (result) {
      res.json(result);
    } else {
      res
        .status(404)
        .send(`User with username ${req.params.username} not found`);
    }
  });
};

// Add input validation with external lib
// Add check for username to match username of userInfo
exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const params = req.params;
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    username,
    password
  } = req.query;

  if (params.username) {
    userDAO.updateUser(params.username, {
      name: { first: firstName, last: lastName },
      dateOfBirth: dateOfBirth,
      email: email,
      username: username,
      password: password
    });
    res.status(204).send();
  } else {
    res
      .status(404)
      .send(
        "No query string passed into request; Must include parameters to be updated"
      );
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    username,
    password
  } = req.query;
  userDAO.createUser(
    firstName,
    lastName,
    dateOfBirth,
    email,
    username,
    password
  );
  res.status(201).send("User created successfully");
};

exports.delete = (req, res) => {
  userDAO.getUser(req.params.username, result => {
    if (result) {
      userDAO.deleteUser(req.params.username);
      res.status(204).send("User successfully deleted");
    } else {
      res
        .status(404)
        .send(`User with username ${req.params.username} not found`);
    }
  });
};

exports.validate = type => {
  switch (type) {
    case "validateUserInfo": {
      return [
        query("firstName", "First name does not exist").exists(),
        query("lastName", "Last name does not exist").exists(),
        query("dateOfBirth", "Date of birth does not exist").exists()
          .custom(date => validateDate(date)),
        query("email", "Email does not exist/invalid")
          .exists()
          .isEmail(),
        query("username", "Username does not exist").exists()
          .custom(username => validateUser(username)),
        query("password", "Password does not exist").exists()
          .custom(password => validatePassword(password)),
      ];
    }
  }
};

// Validating date
// Format must be able to be parsed into Date class
function validateDate(date) {
  if (new Date(date) === "Invalid Date" || isNaN(new Date(date))) {
    throw new Error('Invalid date string');
  }
  return true;
}

// Username must be within 6 and 20 characters
// Username must not contain empty spaces
function validateUser(user) {
  if (user.length < 6) {
    throw new Error('Username is too short (less than 6 characters');
  }
  if (user.length > 20) {
    throw new Error('Username is too long (more than 20 characters)');
  }
  if (user.indexOf(' ') != -1) {
    throw new Error('Username contains a space');
  }
  return true;
}

// Password must be longer than 6 characters
function validatePassword(password) {
  if (password.length < 6) {
    throw new Error('Password is too short (less than 6 characters');
  }
  return true;
}
