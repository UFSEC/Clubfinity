const passport = require('passport');
const express = require('express');
const userController = require('../Controllers/UserController');

const router = express.Router();

router.post(
  '/register',
  userController.validate('validateFullUserInfo'),
  userController.register,
);
router.post(
  '/resend',
  userController.resendEmailVerificationCode,
);
router.post(
  '/verify',
  userController.verifyEmailCode,
);
router.get(
  '/',
  passport.authenticate('loggedIn', { session: false }),
  userController.get,
);
router.put(
  '/',
  passport.authenticate('loggedIn', { session: false }),
  userController.validate('validateBaseUserInfo'),
  userController.update,
);
router.patch(
  '/',
  passport.authenticate('loggedIn', { session: false }),
  userController.validate('validatePushToken'),
  userController.updatePushToken,
);
router.patch(
  '/clubs/:id',
  passport.authenticate('loggedIn', { session: false }),
  userController.validate('validateClubId'),
  userController.updateClubFollowingState,
);

module.exports = router;
