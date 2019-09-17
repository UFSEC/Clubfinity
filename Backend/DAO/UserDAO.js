const User = require("../Model/User.js").Model;

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Implement Mongoose (schema migrations, api, model strictness)
// 3. Get rid of nulls in callbacks
// 4. Clean up a lot of the code
// 5. Possible memoization of db connection
// 6. Return error codes instead of throw exception

exports.createUser = (
  firstname_,
  lastname_,
  dob_,
  email_,
  username_,
  password_
) => {
  const newUser = new User({
    name: { first: firstname_, last: lastname_ },
    dob: dob_,
    username: username_,
    email: email_,
    password: password_
  });
  newUser.save(function(error, document) {
    if (error) {
      throw error;
    } else {
      console.log("Successfully added user " + username_);
    }
  });
};
exports.getAllUsers = callback => {
  if (!callback) {
    throw new Error("Must have a callback function");
  }
  User.find({}, function(error, users) {
    if (error) {
      throw error;
    }
    callback(users);
  });
};
exports.getUser = (username_, callback) => {
  if (!callback) {
    throw new Error("Second parameter must be a callback function");
  }
  User.findOne({ username: username_ }, function(error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      console.log(`Successfully retrieved ${username_} from the database`);
      callback(user);
    } else {
      console.log(
        `Failed to retrieve ${username_} from database; User does not exist`
      );
      callback(null);
    }
  });
};
exports.updateUser = (username_, updatedInfo) => {
  User.findOneAndUpdate(
    { username: username_ },
    updatedInfo,
    { upsert: true },
    function(error, document) {
      if (error) throw error;
      console.log(`Successfully updated ${username_} info`);
    }
  );
};

exports.deleteUser = username_ => {
  User.remove({ username: username_ }, function(error) {
    if (error) {
      console.log(`Failed to remove ${username_}`);
    }
  });
};
