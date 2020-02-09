const clubController = require('../Controllers/ClubController');
const express = require('express');
const router = express.Router();

router.get('/', clubController.getAll);
router.get('/:id', clubController.get);
router.put('/:id', clubController.validate('validateBaseClubInfo'), clubController.update);
router.post('/', clubController.validate('validateCreateClubInfo'), clubController.validate('validateBaseClubInfo'), clubController.create);
router.delete('/:id', clubController.delete);

module.exports = router;
