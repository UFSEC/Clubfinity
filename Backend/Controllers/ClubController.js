const { validationResult, body } = require('express-validator');
const clubDAO = require('../DAO/ClubDAO');
const eventDAO = require('../DAO/EventDAO');
const announcementDAO = require('../DAO/AnnouncementDAO');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');

const validateClubData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

exports.getMultiple = async (req, res) => catchErrors(res, async () => {
  const { type } = req.query;
  switch (type) {
    case 'all':
      return clubDAO.getAll();
    case 'fromAdminId':
      return clubDAO.getByAdminId(req.userId);
    default:
      throw new Error(`Invalid type ${type}`);
  }
});

exports.get = async (req, res) => catchErrors(res, async () => {
  const { select } = req.query;
  const { id: clubId } = req.params;
  switch (select) {
    case 'all':
      return clubDAO.get(clubId);
    case 'posts':
      return {
        events: await eventDAO.getByClubs([clubId]),
        announcements: await announcementDAO.getByClubs([clubId]),
      };
    default:
      throw new Error(`Invalid select ${select}`);
  }
});

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
