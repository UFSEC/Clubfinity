const { validationResult, body } = require('express-validator');
const clubDAO = require('../DAO/ClubDAO');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors, getCurrentUser } = require('../util/httpUtil');

const validateClubData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

exports.getMultiple = async (req, res) => catchErrors(res, async () => {
  const { type } = req.query
  if (type == 'all') {
    return clubDAO.getAll()
  } else if (type == 'fromAdminId') {
    return clubDAO.getByAdminId(req.userId)
  } else {
    throw new Error(`Invalid type ${type}`)
  }
});

exports.get = async (req, res) => catchErrors(res, async () => clubDAO.get(req.params.id));

exports.update = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);

  return clubDAO.update(req.params.id, req.body);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateClubData(req);
  const newClubData = req.body;
  newClubData.admins = [req.userId];
  newClubData.tags = newClubData.tags
    .replace(' ', '')
    .split(',')
    .filter(Boolean);

  const { _id: id } = await clubDAO.create(req.body);
  return clubDAO.get(id);
});

exports.delete = async (req, res) => catchErrors(res, async () => clubDAO.delete(req.params.id));

exports.validate = (type) => {
  switch (type) {
    case 'validateBaseClubInfo': {
      return [
        body('name', 'Club name does not exist').exists(),
        body('category', 'Club category does not exist').exists(),
        body(
          'description',
          'Description does not exist or is invalid',
        ).exists(),
      ];
    }
    case 'validateCreateClubInfo': {
      return [body('tags', 'Tags does not exist').exists()];
    }
    case 'validateUpdateClubInfo': {
      return [body('admins', 'Club admins does not exist').exists()];
    }
    default: {
      throw new Error('Invalid validator');
    }
  }
};
