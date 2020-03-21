const eventController = require('../Controllers/EventController');
const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', eventController.getAll);
router.get('/following', passport.authenticate("loggedIn", { session: false }), eventController.getFollowing);
router.get('/inMonth/:date', passport.authenticate("loggedIn", { session: false }), eventController.getInMonth);
router.get('/:id', eventController.get);
router.put('/:id', eventController.validate('validateEventInfo'), eventController.update);
router.post('/', eventController.validate('validateEventInfo'), eventController.create);
router.get('/:id/going-users', passport.authenticate("loggedIn", { session: false }), eventController.validate('validateExistingEvent'), eventController.getGoingUsers);
router.post('/:id/going-users', passport.authenticate("loggedIn", { session: false }), eventController.validate('validateExistingEvent'), eventController.addGoingUser);
router.delete('/:id/going-users', passport.authenticate("loggedIn", { session: false }), eventController.validate('validateExistingEvent'), eventController.removeGoingUser);
router.delete('/:id', eventController.delete);

module.exports = router;
