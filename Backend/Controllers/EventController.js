const eventDAO = require("../DAO/EventDAO");
const { validationResult, body, param } = require("express-validator");
const { ValidationError } = require( '../util/exceptions');
const { catchErrors, getCurrentUser } = require('../util/httpUtil');

const validateEventData = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError(errors.array());
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return eventDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return eventDAO.get(req.params['id']);
});

exports.getByClub = async (req, res) => catchErrors(res, async () => {
  return eventDAO.getByClubs([req.params['clubId']]);
});

exports.getFollowing = async (req, res) => catchErrors(res, async () => {
  const user = await getCurrentUser(req);

  return await eventDAO.getByClubs(user.clubs);
});

exports.getInMonth = async (req, res) => catchErrors(res, async () => {
  const searchDate = new Date(req.params['date']);
  const user = await getCurrentUser(req);

  switch (req.query.filter) {
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
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params['id'], req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.create(req.body);
});

exports.getGoingUsers = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.getGoingUsers(req.params['id'])
});

exports.addGoingUser = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params['id'], { $addToSet: { goingUsers: req.userId  } })
});

exports.removeGoingUser = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params['id'], { $pull: { goingUsers: req.userId  } })
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  return eventDAO.delete(req.params['id']);
});

exports.validate = type => {
  switch (type) {
    case "validateEventInfo": {
      return [
        body("name", "Event name does not exist").exists(),
        body("location", "Location does not exist").exists(),
        body("major_of_interest", "Major of interest does not exist").exists(),
        body("description", "Description does not exist").exists(),
        body("date", "Date does not exist").exists(),
        body("club", "Club id does not exist").exists()
      ];
    }
    case "validateExistingEvent": {
      return [
        param("id", "Event id does not exist or invalid")
          .exists()
          .custom(date => validateEvent(date))
      ];
    }
  }
};

async function validateEvent(id) {
  try {
    await eventDAO.get(id);
  } catch (error) {
    throw new Error("Event with given id doesn't exist");
  }
}
