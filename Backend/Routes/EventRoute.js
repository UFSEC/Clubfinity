const eventController = require('../Controllers/EventController');
const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/event', eventController.getAll);
router.get('/event/:id', eventController.get);
router.get('/event/following/:userId', passport.authenticate("loggedIn", { session: false }), eventController.getFollowing);
router.put('/event/:id', eventController.validate('validateEventInfo'), eventController.update);
router.post('/event', eventController.validate('validateEventInfo'), eventController.create);
router.delete('/event/:id', eventController.delete);

module.exports = router;
