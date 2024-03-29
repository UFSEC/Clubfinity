const { validationResult, body, param } = require('express-validator');
const { DateTime } = require('luxon');
const eventDAO = require('../DAO/EventDAO');
const clubDAO = require('../DAO/ClubDAO');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors, getCurrentUser } = require('../util/httpUtil');
const { sendNotifications } = require('../util/notificationUtil');

const validateEventData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

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
      throw new Error(`Filter '${filter}' does not exist`);
  }
};

exports.getMultiple = async (req, res) => catchErrors(res, async () => {
  const { filterBy } = req.query;
  switch (filterBy) {
    case 'userId': {
      const user = await getCurrentUser(req);
      return eventDAO.getByClubs(user.clubs);
    }
    case 'month': {
      const user = await getCurrentUser(req);
      const { date, filter } = req.query;
      return getInMonth(date, user, filter);
    }
    case 'club': {
      const { clubId } = req.query;
      return eventDAO.getByClubs(clubId);
    }
    default:
      throw new Error(`Invalid type ${filterBy}`);
  }
});

exports.get = async (req, res) => catchErrors(res, async () => req.params.id);

exports.update = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params.id, req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  if (!(await clubDAO.isAdmin(req.userId, req.body.club))) {
    throw new Error('Only admins of this club can create an event');
  }
  req.body.date = DateTime.fromISO(req.body.date);
  const newEvent = await eventDAO.create(req.body);
  if (newEvent) {
    sendNotifications(req.body.club, req.body.name);
  }
  return newEvent;
});

exports.updateGoingUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query;
  switch (op) {
    case 'add':
      eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } });
      eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } });
      await eventDAO.update(req.params.id, { $addToSet: { goingUsers: req.userId } });
      break;
    case 'remove':
      await eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } });
      break;
    default:
      throw new Error(`Invalid operation ${op}`);
  }
});

exports.updateInterestedUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query;
  switch (op) {
    case 'add':
      eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } });
      eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } });
      await eventDAO.update(req.params.id, { $addToSet: { interestedUsers: req.userId } });
      break;
    case 'remove':
      await eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } });
      break;
    default:
      throw new Error(`Invalid operation ${op}`);
  }
});

exports.updateUninterestedUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  const { op } = req.query;
  switch (op) {
    case 'add':
      eventDAO.update(req.params.id, { $pull: { interestedUsers: req.userId } });
      eventDAO.update(req.params.id, { $pull: { goingUsers: req.userId } });
      await eventDAO.update(req.params.id, { $addToSet: { uninterestedUsers: req.userId } });
      break;
    case 'remove':
      await eventDAO.update(req.params.id, { $pull: { uninterestedUsers: req.userId } });
      break;
    default:
      throw new Error(`Invalid operation ${op}`);
  }
});

exports.delete = async (req, res) => catchErrors(res, async () => eventDAO.delete(req.params.id));

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
