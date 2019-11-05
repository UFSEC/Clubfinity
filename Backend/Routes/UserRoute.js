const userController = require('../Controllers/UserController');
const express = require('express');
const router = express.Router();

router.get('/user', userController.getAll);
router.get('/user/:id', userController.get);
router.put('/user/:id', userController.validate('validateUserInfo'), userController.update);
router.post('/user', userController.validate('validateUserInfo'), userController.create);
router.delete('/user/:id', userController.delete);

module.exports = router;
