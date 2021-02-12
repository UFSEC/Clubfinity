const Event = require('../Model/Event.js').Model;
const clubDAO = require('./ClubDAO');
const { NotFoundError } = require('../util/errors/notFoundError');

const filterInMonth = (searchDate, events) => events.filter((e) => e.date.month === searchDate.month
           && e.date.year === searchDate.year);

exports.create = async (eventParams) => {
  if (await Event.exists({ name: eventParams.name })) {
    throw Error('Event already exists!');
  }
  if (!(await clubDAO.exists(eventParams.club))) {
    throw Error('Club does not exist');
  }
  const updatedEventParams = eventParams;
  updatedEventParams.club = (await clubDAO.get(eventParams.club))._id;

  return await new Event(updatedEventParams).save();
};

exports.getAll = async () => await Event.find({}).populate('club').exec();

exports.getAllEventsInMonth = async (date) => {
  const allEvents = await exports.getAll();
  return filterInMonth(date, allEvents);
};

exports.getEventsFromFollowedClubsInMonth = async (date, user) => {
  if (user.clubs.length === 0) return [];

  const followingEvents = await exports.getByClubs(user.clubs);
  return filterInMonth(date, followingEvents);
};

exports.getGoingEventsInMonth = async (date, user) => {
  const goingEvents = await exports.getEventsUserIsGoingTo(user._id);
  return filterInMonth(date, goingEvents);
};

exports.get = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError();

  return event;
};

exports.getByName = async (name) => {
  const event = await Event.findOne({ name });
  if (!event) throw new NotFoundError();

  return event;
};

exports.getByClubs = async (clubs) => {
  const events = await Event
    .find({ club: { $in: clubs } })
    .populate('club')
    .exec();

  if (!events) throw NotFoundError();
  return events;
};

exports.getGoingUsers = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError();

  return event.goingUsers;
};

exports.getEventsUserIsGoingTo = async (userId) => await Event.find({ goingUsers: userId }).populate('club').exec();

exports.update = async (id, updatedData) => {
  await Event.findOneAndUpdate({ _id: id }, updatedData, { upsert: true, useFindAndModify: false });
  return exports.get(id);
};

exports.delete = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new NotFoundError();

  return event;
};

exports.deleteAll = async () => {
  await Event.deleteMany();
};
