const mongoose = require('mongoose');
const Announcement = require('../Model/Announcement.js').Model;
const { NotFoundError } = require('../util/errors/notFoundError');
const clubDAO = require('./ClubDAO');

exports.get = async (id) => {
  const announcement = await Announcement.findById(id);
  if (!announcement) throw new NotFoundError();

  return announcement;
};

exports.getByClubs = async (clubIds) => {
  const announcements = await Announcement
    .find({ club: { $in: clubIds } })
    .populate('club')
    .exec();

  if (!announcements) throw NotFoundError();

  return announcements;
};

exports.create = async (params) => {
  if (!(await clubDAO.exists(params.club))) {
    throw Error('Club does not exist');
  }

  const updatedParams = params;
  updatedParams.club = mongoose.Types.ObjectId(params.club);

  return new Announcement(updatedParams).save();
};

exports.update = async (id, params) => {
  const { title, description } = params;
  await Announcement.findOneAndUpdate({ _id: id }, { title, description }, {
    upsert: true,
    useFindAndModify: false,
  });

  return exports.get(id);
};

exports.delete = async (id) => {
  const announcement = await Announcement.findByIdAndDelete(id);
  if (!announcement) throw new NotFoundError();

  return announcement;
};

exports.deleteAll = async () => {
  await Announcement.deleteMany();
};
