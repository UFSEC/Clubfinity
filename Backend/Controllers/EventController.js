const eventDAO = require("../DAO/EventDAO");
const { validationResult, body } = require("express-validator");
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
  return eventDAO.get(req.params['id']);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.update(req.params['id'], req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateEventData(req);

  return eventDAO.create(req.body);
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
  }
};

// Validating date
// Format must be able to be parsed into Date class
function validateDate(date) {
  if (new Date(date) === "Invalid Date" || isNaN(new Date(date))) {
    throw new Error("Invalid date string");
  }
  return true;
}
