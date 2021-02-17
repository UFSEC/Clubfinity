const passport = require('passport');
const express = require('express');
const clubController = require('../Controllers/ClubController');

const router = express.Router();

router.get('/', passport.authenticate('loggedIn', { session: false }),
  clubController.getMultiple);
router.get('/:id', clubController.get);
router.put('/:id', passport.authenticate('loggedIn', { session: false }),
  clubController.validate('validateBaseClubInfo'),
  clubController.update);
router.post('/', passport.authenticate('loggedIn', { session: false }),
  clubController.validate('validateCreateClubInfo'),
  clubController.validate('validateBaseClubInfo'),
  clubController.create);

module.exports = router;
