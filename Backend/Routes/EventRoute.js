const passport = require('passport');
const express = require('express');
const eventController = require('../Controllers/EventController');

const router = express.Router();

router.get('/', passport.authenticate('loggedIn', { session: false }), eventController.getAll);
router.get('/following', passport.authenticate('loggedIn', { session: false }), eventController.getFollowing);
router.get('/inMonth/:date', passport.authenticate('loggedIn', { session: false }), eventController.getInMonth);
router.get('/:id', passport.authenticate('loggedIn', { session: false }), eventController.get);
router.get('/club/:clubId', passport.authenticate('loggedIn', { session: false }), eventController.getByClub);
router.put('/:id', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateUpdateEventInfo'), eventController.update);
router.post('/', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateEventInfo'), eventController.create);
router.get('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.getGoingUsers);
router.post('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.addGoingUser);
router.delete('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.removeGoingUser);
router.delete('/:id', passport.authenticate('loggedIn', { session: false }), eventController.delete);

module.exports = router;
