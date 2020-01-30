const clubController = require('../Controllers/ClubController');
const express = require('express');
const router = express.Router();

router.get('/club', clubController.getAll);
router.get('/club/:id', clubController.get);
router.put('/club/:id', clubController.validate('validateClubInfo'), clubController.update);
router.post('/club', clubController.validate('validateClubInfo'), clubController.create);
router.delete('/club/:id', clubController.delete);

module.exports = router;
