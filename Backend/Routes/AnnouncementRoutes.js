const passport = require('passport');
const express = require('express');
const controller = require('../Controllers/AnnouncementController');

const router = express.Router();

router.get('/', passport.authenticate('loggedIn', { session: false }), controller.getMultiple);
router.get('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('idParam'), controller.get);
router.post('/', passport.authenticate('loggedIn', { session: false }), controller.validate('announcementBody'), controller.create);
router.put('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('announcementUpdate'), controller.update);
router.delete('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('idParam'), controller.delete);

module.exports = router;
