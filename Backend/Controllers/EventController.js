const { validationResult, body, param } = require('express-validator');
const { DateTime } = require('luxon');
const eventDAO = require('../DAO/EventDAO');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors, getCurrentUser } = require('../util/httpUtil');

const validateEventData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

exports.getMultiple = async (req, res) => catchErrors(res, async () => {
  const { filterBy } = req.query
  if (filterBy == 'userId') {
    const user = await getCurrentUser(req);
    return eventDAO.getByClubs(user.clubs);
  } else if (filterBy == 'month') {
    const user = await getCurrentUser(req);
    const { date, filter } = req.query
    return getInMonth(date, user, filter)
  } else if (filterBy == 'club') {
    const { clubId } = req.query
    return eventDAO.getByClubs(clubId)
  } else {
    throw new Error(`Invalid type ${filterBy}`)
  }
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return req.params.id
})

exports.update = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params.id, req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  req.body.date = DateTime.fromISO(req.body.date);
  return eventDAO.create(req.body);
});

exports.updateGoingUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query
  if (op == 'add') {
    eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } });
    eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } });
    await eventDAO.update(req.params.id, { $addToSet: { goingUsers: req.userId } });
  } else if (op == 'remove') {
    await eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } })
  } else {
    throw new Error(`Invalid operation ${op}`)
  }
});

exports.updateInterestedUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query
  if (op == 'add') {
    eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } });
    eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } });
    await eventDAO.update(req.params.id, { $addToSet: { interestedUsers: req.userId } });
  } else if (op == 'remove') {
    await eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } })
  } else {
    throw new Error(`Invalid operation ${op}`)
  }
});

exports.updateUninterestedUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query
  if (op == 'add') {
    eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } });
    eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } });
    await eventDAO.update(req.params.id, { $addToSet: { uninterestedUsers: req.userId } });
  } else if (op == 'remove') {
    await eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } })
  } else {
    throw new Error(`Invalid operation ${op}`)
  }
});

exports.delete = async (req, res) => catchErrors(res, async () => eventDAO.delete(req.params.id));

const getInMonth = async (date, user, filter) => {
  const searchDate = DateTime.fromISO(date);
  switch (filter) {
    case undefined:
    case 'all':
    case '':
      return await eventDAO.getAllEventsInMonth(searchDate);
    case 'following':
      return await eventDAO.getEventsFromFollowedClubsInMonth(searchDate, user);
    case 'going':
      return await eventDAO.getGoingEventsInMonth(searchDate, user);
    default:
      throw new Error(`Filter '${req.query.filter}' does not exist`);
  }
};

async function validateEvent(id) {
  try {
    await eventDAO.get(id);
  } catch (error) {
    throw new Error("Event with given id doesn't exist");
  }
}

exports.validate = (type) => {
  switch (type) {
    case 'validateEventInfo': {
      return [
        body('name', 'Event name does not exist').exists(),
        body('location', 'Location does not exist').exists(),
        body('description', 'Description does not exist').exists(),
        body('date', 'Date does not exist').exists(),
        body('club', 'Club id does not exist').exists(),
      ];
    }
    case 'validateUpdateEventInfo': {
      return [
        body('name', 'Event name does not exist').exists(),
        body('location', 'Location does not exist').exists(),
        body('description', 'Description does not exist').exists(),
        body('date', 'Date does not exist').exists(),
      ];
    }
    case 'validateExistingEvent': {
      return [
        param('id', 'Event id does not exist or invalid')
          .exists()
          .custom((date) => validateEvent(date)),
      ];
    }
    default: {
      throw new Error('Invalid validator');
    }
  }
};
