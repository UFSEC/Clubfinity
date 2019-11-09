const User = require("../Model/User.js").Model;

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Clean up a lot of the code
// 3. Possible memoization of db connection
// 4. Return error codes instead of throw exception

exports.createUser = (
  firstname_,
  lastname_,
  dob_,
  email_,
  username_,
  password_
) => {
  User.exists({ username: username_ }).then(result => {
    if (result) {
      console.log("Username " + username_ + " already exists!");
    } else {
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
    }
  });
};
exports.getAllUsers = () => {
  return User.find({})
    .exec()
    .then(users => {
      if (!users) {
        console.log("Error finding all users!");
        return {};
      } else {
        return users;
      }
    });
};

exports.getUser = username_ => {
  return User.findOne({ username: username_ })
    .exec()
    .then(user => {
      if (user) {
        console.log(`Successfully retrieved ${username_} from the database`);
        return user;
      } else {
        console.log(
          `Failed to retrieve ${username_} from database; User does not exist`
        );
        return null;
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
