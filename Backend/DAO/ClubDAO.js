const Club = require('../Model/Club.js').Model;
const { NotFoundError } = require('../util/errors/validationError');

exports.create = async (clubParams) => await new Club(clubParams).save();

exports.getAll = async () => await Club.find({})
  .populate({
    path: 'admins',
    model: 'User',
    select: { '_id': 1, 'name': 1, 'major': 1, 'year': 1 }
  })
  .exec();

exports.get = async (id) => {
  const club = await Club.findById(id).populate({
    path: 'admins',
    model: 'User',
    select: { '_id': 1, 'name': 1, 'major': 1, 'year': 1 }
  }).exec();
  
  if (!club) throw new NotFoundError();

  return club;
};

exports.getByAdminId = async (userId) => Club.find({ admins: userId })
  .populate({
    path: 'admins',
    model: 'User',
    select: { '_id': 1, 'name': 1, 'major': 1, 'year': 1 }
  })

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
