const clubDAO = require("../DAO/ClubDAO");
const { validationResult, body } = require("express-validator");
const { ValidationError } = require( '../util/exceptions');
const { catchErrors, getCurrentUser } = require('../util/httpUtil');

const validateClubData = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ValidationError(errors.array());
};

exports.getAll = async (req, res) => catchErrors(res, async () => {
  return clubDAO.getAll();
});

exports.get = async (req, res) => catchErrors(res, async () => {
  return clubDAO.get(req.params['id']);
});

exports.getFollowing = async (req, res) => catchErrors(res, async () => {
  const user = await getCurrentUser(req);
  return user.clubs;
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);

  return clubDAO.update(req.params['id'], req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);
  const newClubData = req.body
  newClubData['admins'] = [req.userId]
  newClubData['tags'] = newClubData['tags'].replace(' ', '').split(',').filter(Boolean)

  return clubDAO.create(req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  return clubDAO.delete(req.params['id']);
});

exports.validate = type => {
  switch (type) {
    case "validateBaseClubInfo": {
      return [
        body("name", "Club name does not exist").exists(),
        body("category", "Club category does not exist").exists(),
        body("description", "Description does not exist or is invalid").exists()
      ];
    }
    case "validateCreateClubInfo": {
      return [
        body("tags", "Tags does not exist").exists(),
      ];
    }
    case "validateUpdateClubInfo": {
      return [
        body("admins", "Club admins does not exist").exists(),
      ];
    }
  }
};
