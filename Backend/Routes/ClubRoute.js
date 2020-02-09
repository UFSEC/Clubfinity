const clubController = require('../Controllers/ClubController');
const express = require('express');
const router = express.Router();

router.get('/club', clubController.getAll);
router.get('/club/:id', clubController.get);
router.put('/club/:id', clubController.validate('validateBaseClubInfo'), clubController.update);
router.post('/club', clubController.validate('validateCreateClubInfo'), clubController.validate('validateBaseClubInfo'), clubController.create);
router.delete('/club/:id', clubController.delete);

module.exports = router;
