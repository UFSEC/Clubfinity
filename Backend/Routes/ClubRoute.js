const passport = require('passport');
const express = require('express');
const clubController = require('../Controllers/ClubController');

const router = express.Router();

router.get('/', clubController.getAll);
router.get(
  '/following',
  passport.authenticate('loggedIn', { session: false }),
  clubController.getFollowing,
);
router.get('/:id', clubController.get);

router.get('/random', clubController.getRandom);

router.put(
  '/:id',
  passport.authenticate('loggedIn', { session: false }),
  clubController.validate('validateBaseClubInfo'),
  clubController.update,
);
router.post(
  '/',
  passport.authenticate('loggedIn', { session: false }),
  clubController.validate('validateCreateClubInfo'),
  clubController.validate('validateBaseClubInfo'),
  clubController.create,
);
router.delete(
  '/:id',
  passport.authenticate('loggedIn', { session: false }),
  clubController.delete,
);

module.exports = router;
