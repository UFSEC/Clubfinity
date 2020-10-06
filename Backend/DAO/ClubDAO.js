const Club = require("../Model/Club.js").Model;
const { NotFoundError } = require("../util/errors/validationError");

exports.create = async (clubParams) => await new Club(clubParams).save();

exports.getAll = async () => await Club.find({}).exec();

exports.getRandom = async () => {
  const clubs = await Club.find({});
  const index = Math.floor(Math.random() * clubs.length);
  return clubs[index];
};
exports.get = async (id) => {
  const club = await Club.findById(id);
  if (!club) throw new NotFoundError();

  return club;
};

exports.exists = async (id) => {
  try {
    return await Club.exists({ _id: id });
  } catch (error) {
    return false;
  }
};

exports.update = async (id, updateData) => {
  await Club.findOneAndUpdate({ _id: id }, updateData, {
    upsert: true,
    useFindAndModify: false,
  });
  return exports.get(id);
};

exports.delete = async (id) => {
  const club = await Club.findByIdAndDelete(id);
  if (!club) throw new NotFoundError();

  return club;
};

exports.deleteAll = async () => {
  await Club.deleteMany();
};
