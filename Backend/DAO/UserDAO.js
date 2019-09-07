var User = require("../Model/User.js");
var mongodb = require("mongodb");
const config = require("../Config/config.json");

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Implement Mongoose (schema migrations, api, model strictness)
// 3. Get rid of nulls in callbacks
// 4. Clean up a lot of the code
// 5. Possible memoization of db connection

var MongoClient = mongodb.MongoClient;
var url =
  "mongodb://" +
  config.development.database.host +
  ":" +
  config.development.database.port +
  "/" +
  config.development.database.database;
const userCollectionName = config.development.users.collection;

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw new Error(err);
  }
  var collection = db.collection(userCollectionName);

  exports.createUser = (
    firstname_,
    lastname_,
    dob_,
    email_,
    username_,
    password_
  ) => {
    collection.insertOne(
      {
        firstName: firstname_,
        lastName: lastname_,
        dateOfBirth: dob_,
        email: email_,
        username: username_,
        password: password_
      },
      function(err, db) {
        if (err) {
          throw err;
        }
        console.log(`Successfully added ${username_} to the database`);
      }
    );
  };
  exports.getAllUsers = callback => {
    if (!callback) {
      throw new Error("Second parameter must be a callback function");
    }
    collection.find().toArray(function(err, result) {
      if (result.length) {
        callback(result);
      } else {
        callback(null);
      }
    });
  };
  exports.getUser = (username_, callback) => {
    if (!callback) {
      throw new Error("Second parameter must be a callback function");
    }
    collection.findOne({ username: username_ }).then(function(doc) {
      if (doc) {
        console.log(`Successfully retrieved ${username_} from the database`);
        callback(
          doc,
          new User.init(
            doc.firstName,
            doc.lastName,
            doc.dateOfBirth,
            doc.email,
            doc.username,
            doc.password
          )
        );
      } else {
        console.log(
          `Failed to retrieve ${username_} from database; User does not exist`
        );
        callback(null);
      }
    });
  };
  exports.updateUser = (username_, updatedInfo) => {
    collection.updateOne({ username: username_ }, updatedInfo, function(
      err,
      obj
    ) {
      if (err) {
        throw err;
      }
      console.log(`${username_} successfully updated!`);
    });
  };
  exports.deleteUser = username_ => {
    collection.deleteOne({ username: username_ }, function(err, obj) {
      if (err) {
        throw err;
      }
      console.log(`${username_} successfully deleted from the database`);
    });
  };
});
