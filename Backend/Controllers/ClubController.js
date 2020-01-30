const clubDAO = require("../DAO/ClubDAO");
const { validationResult, body } = require("express-validator");
const { ValidationError, NotFoundError } = require( '../util/exceptions');

const validateClubData = req => {
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
      res.status(400).send({ ok: false, error: e.message});i
    }
  }
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return clubDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return clubDAO.get(req.params['id']);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);

  return clubDAO.update(req.params['id'], req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);

  return clubDAO.create(req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  return clubDAO.delete(req.params['id']);
});

exports.validate = type => {
  switch (type) {
    case "validateClubInfo": {
      return [
        body("name", "Club name does not exist").exists(),
        body("category", "Club category does not exist").exists(),
        body("facebook_link", "Facebook link does not exist").exists(),
        body("admins", "Admin does not exist or is invalid").exists(),
        body("description", "Description does not exist or is invalid").exists()
      ];
    }
  }
};
