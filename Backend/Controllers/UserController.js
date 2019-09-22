var userDAO = require("../DAO/UserDAO");
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
      res.status(404).send(`User with username ${req.params.username} not found`);
    }
  });
};

// Add input validation with external lib
exports.update = (req, res) => {
  const username = req.params;
  const userInfo = req.query;

  if (Object.keys(username).length != 0) {
    const props = Object.keys(userInfo);
    if (
      props.length == 6 &&
      props[0] == "firstName" &&
      props[1] == "lastName" &&
      props[2] == "dob" &&
      props[3] == "email" &&
      props[4] == "username" &&
      props[5] == "password"
    ) {
      userDAO.updateUser(username.username, {
        name: { first: userInfo.firstName, last: userInfo.lastName },
        dob: userInfo.dob,
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password
      });
      res.status(204).send();
    } else {
      res.status(404).send("Insufficient parameters provided");
    }
  } else {
    res
      .status(404)
      .send(
        "No query string passed into request; Must include parameters to be updated"
      );
  }
};

exports.create = (req, res) => {
  const params = req.query;
  if (Object.keys(params).length == 6) {
    // <=CHANGE THIS LATER I DON'T LIKE MAGIC NUMBERS
    userDAO.createUser(
      params["fname"],
      params["lname"],
      params["dateOfBirth"],
      params["email"],
      params["username"],
      params["password"]
    );
    res.status(201).send("User created successfully");
  } else {
    res.status(404).send("Insufficient parameters provided");
  }
};
exports.delete = (req, res) => {
  userDAO.getUser(req.params.username, result => {
    if (result) {
      userDAO.deleteUser(req.params.username);
      res.status(204).send("User successfully deleted");
    } else {
      res.status(404).send(`User with username ${req.params.username} not found`);
    }
  });
};
