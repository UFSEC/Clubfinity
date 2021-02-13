const passport = require('passport');
const express = require('express');
const eventController = require('../Controllers/EventController');

const router = express.Router();

router.get('/', passport.authenticate('loggedIn', { session: false }), eventController.getMultiple);
router.get('/:id', passport.authenticate('loggedIn', { session: false }), eventController.get);
router.get('/clubs/:clubId', passport.authenticate('loggedIn', { session: false }), eventController.getByClub);


router.put('/:id', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateUpdateEventInfo'), eventController.update);
router.post('/', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateEventInfo'), eventController.create);
router.get('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.getGoingUsers);
router.post('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.addGoingUser);
router.delete('/:id/going-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.removeGoingUser);
router.post('/:id/interested-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.addInterestedUser);
router.delete('/:id/interested-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.removeInterestedUser);
router.post('/:id/uninterested-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.addUninterestedUser);
router.delete('/:id/uninterested-users', passport.authenticate('loggedIn', { session: false }), eventController.validate('validateExistingEvent'), eventController.removeUninterestedUser);
router.delete('/:id', passport.authenticate('loggedIn', { session: false }), eventController.delete);

module.exports = router;
