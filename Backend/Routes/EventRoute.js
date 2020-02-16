const eventController = require('../Controllers/EventController');
const express = require('express');
const router = express.Router();

router.get('/', eventController.getAll);
router.get('/:id', eventController.get);
router.put('/:id', eventController.validate('validateEventInfo'), eventController.update);
router.post('/', eventController.validate('validateEventInfo'), eventController.create);
router.delete('/:id', eventController.delete);

module.exports = router;
