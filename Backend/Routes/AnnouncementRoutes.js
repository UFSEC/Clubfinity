const passport = require('passport');
const express = require('express');
const controller = require('../Controllers/AnnouncementController');

const router = express.Router();

router.get('/club/:clubId', passport.authenticate('loggedIn', { session: false }), controller.validate('clubIdParam'), controller.getByClub);
router.get('/following', passport.authenticate('loggedIn', { session: false }), controller.getFollowing);
router.get('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('idParam'), controller.get);
router.post('/', passport.authenticate('loggedIn', { session: false }), controller.validate('announcementBody'), controller.create);
router.put('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('announcementBody'), controller.update);
router.delete('/:id', passport.authenticate('loggedIn', { session: false }), controller.validate('idParam'), controller.delete);

module.exports = router;
