const { validationResult, body, param } = require('express-validator');
const { DateTime } = require('luxon');
const { ValidationError } = require('../util/errors/validationError');
const { catchErrors } = require('../util/httpUtil');
const announcementDAO = require('../DAO/AnnouncementDAO');

const validateAnnouncementData = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors.array());
};

exports.get = async (req, res) => catchErrors(res, async () => {
  validateAnnouncementData(req);

  return announcementDAO.get(req.params.id);
});

exports.getMultiple = async (req, res) => catchErrors(res, async () => {
  const { filterBy } = req.query;
  if (filterBy === 'club') {
    const { clubId } = req.query;
    return announcementDAO.getByClubs([clubId]);
  }
  throw new Error(`Invalid type ${filterBy}`);
});

exports.create = async (req, res) => catchErrors(res, async () => {
  validateAnnouncementData(req);

  req.body.date = DateTime.fromISO(req.body.date);
  return announcementDAO.create(req.body);
});

exports.update = async (req, res) => catchErrors(res, async () => {
  validateAnnouncementData(req);

  req.body.date = DateTime.fromISO(req.body.date);

  return announcementDAO.update(req.params.id, req.body);
});

exports.delete = async (req, res) => catchErrors(res, async () => {
  validateAnnouncementData(req);

  return announcementDAO.delete(req.params.id);
});

exports.validate = (type) => {
  switch (type) {
    case 'announcementBody': {
      return [
        body('title', 'title does not exist').exists(),
        body('description', 'description does not exist').exists(),
        body('date', 'date does not exist').exists(),
        body('club', 'club id does not exist').exists(),
      ];
    }
    case 'announcementUpdate': {
      return [
        body('title', 'title does not exist').exists(),
        body('description', 'description does not exist').exists(),
      ];
    }
    case 'idParam': {
      return [
        param('id', 'id not given').exists(),
      ];
    }
    case 'clubIdParam': {
      return [
        param('clubId', 'club id not given').exists(),
      ];
    }
    default: {
      throw new Error('Invalid validator');
    }
  }
};
