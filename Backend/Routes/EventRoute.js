const passport = require('passport');
const express = require('express');
const eventController = require('../Controllers/EventController');

const router = express.Router();

router.get('/', passport.authenticate('loggedIn', { session: false }),
    eventController.getMultiple
);
router.get('/:id', passport.authenticate('loggedIn', { session: false }),
    eventController.get
);
router.get('/clubs/:clubId', passport.authenticate('loggedIn', { session: false }),
    eventController.getByClub
);
router.put('/:id', passport.authenticate('loggedIn', { session: false }),
    eventController.validate('validateUpdateEventInfo'), eventController.update
);
router.post('/', passport.authenticate('loggedIn', { session: false }),
    eventController.validate('validateEventInfo'), eventController.create
);
router.patch('/:id/going-users', passport.authenticate('loggedIn', { session: false }),
    eventController.validate('validateExistingEvent'), eventController.updateGoingUsers
);
router.patch('/:id/interested-users', passport.authenticate('loggedIn', { session: false }),
    eventController.validate('validateExistingEvent'), eventController.updateInterestedUsers
);
router.patch('/:id/uninterested-users', passport.authenticate('loggedIn', { session: false }),
    eventController.validate('validateExistingEvent'), eventController.updateUninterestedUsers
);
router.delete('/:id', passport.authenticate('loggedIn', { session: false }),
    eventController.delete
);

module.exports = router;
