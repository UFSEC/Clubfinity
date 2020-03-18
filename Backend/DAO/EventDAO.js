const Event = require("../Model/Event.js").Model;
const clubDAO = require("../DAO/ClubDAO");

exports.create = async eventParams => {
  if (await Event.exists({ name: eventParams.name })) {
    throw Error("Event already exists!");
  }
  if (!(await clubDAO.exists(eventParams.club))) {
    throw Error("Club does not exist");
  }
  eventParams.club = (await clubDAO.get(eventParams.club))._id

  return await new Event(eventParams).save()
}

exports.getAll = async () => {
  return await Event.find({}).exec();
};

exports.get = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError();

  return event;
};

exports.getByName = async name => {
  const event = await Event.findOne({name: name});
  if (!event) throw new NotFoundError();

  return event;
};

exports.getByClubs = async (clubs) => {
  const events = await Event.find({
    club: { $in: clubs}
  });

  if (!events) throw NotFoundError();
  return events
}

exports.getGoingUsers = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError();

  return event.goingUsers;
};

exports.update = async (id, updatedData) => {
  await Event.findOneAndUpdate({ _id: id   }, updatedData, { upsert: true, useFindAndModify: false });

  return exports.get(id);
};

exports.delete = async id => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new NotFoundError();

  return event;
};
