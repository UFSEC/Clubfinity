const Event = require("../Model/Event.js").Model;

exports.create = async eventParams => {
  if (await Event.exists({ id: eventParams.id })) {
    throw Error("Event already exists!");
  }

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

exports.update = async (id, updatedData) => {
  await Event.findOneAndUpdate({ _id: id   }, updatedData, { upsert: true, useFindAndModify: false });

  return exports.get(id);
};

exports.delete = async id => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new NotFoundError();

  return event;
};
