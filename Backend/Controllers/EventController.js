const eventDAO = require("../DAO/EventDAO");
const userDAO = require("../DAO/UserDAO");
const { validationResult, body, param } = require("express-validator");
const { ValidationError, NotFoundError } = require( '../util/exceptions');

const validateEventData = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError(errors.array());
};

const catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message, validationErrors: e.validationErrors });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      res.status(400).send({ ok: false, error: e.message});
    }
  }
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return eventDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  console.log('cattt')
  return eventDAO.get(req.params['id']);
});

exports.getFollowing = async (req, res) => catchErrors(res, async () => {
  let user;
  try {
    user = await userDAO.get(req.userId);
  } catch (error) {
    throw new NotFoundError();
  }

  const clubs = user.clubs;
  const followingEvents = await eventDAO.getByClubs(clubs);
  return followingEvents;
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

  return eventDAO.getGoingUsers(req.params['id'], { $addToSet: { usersGoing: req.userId  } })
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
