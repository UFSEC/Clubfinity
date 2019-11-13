const eventController = require('../Controllers/EventController');
const express = require('express');
const router = express.Router();

router.get('/event', eventController.getAll);
router.get('/event/:id', eventController.get);
router.put('/event/:id', eventController.validate('validateEventInfo'), eventController.update);
router.post('/event', eventController.validate('validateEventInfo'), eventController.create);
router.delete('/event/:id', eventController.delete);

module.exports = router;
