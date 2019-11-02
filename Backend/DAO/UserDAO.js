const User = require("../Model/User.js").Model;
const { NotFoundError } = require("../util/exceptions");

// TODO
// 1. Add support for a prod/dev config without hardcoded vars
// 2. Possible memoization of db connection

exports.create = async userParams => {
  if (await User.exists({ username: userParams.username })) {
    throw Error("username already taken");
  }

  return await new User(userParams).save();
};

exports.getAll = async () => {
  return await User.find({}).exec();
};

exports.get = async id => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError();

  return user;
};

exports.getByUsername = async username => {
  const user = await User.findOne({ username: username });
  if (!user) throw new NotFoundError();

  return user;
};

exports.update = async (id, updatedData) => {
  await User.findOneAndUpdate({ _id: id }, updatedData, {
    upsert: true,
    useFindAndModify: false
  });

  return exports.get(id);
};

exports.delete = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new NotFoundError();

  return user;
};

exports.deleteAll = async () => {
  await User.deleteMany();
};
