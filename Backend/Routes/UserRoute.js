var userController = require('../Controllers/UserController');
var express = require('express');
var router = express.Router();
router.get('/user',userController.getAll);
router.get('/user/:username',userController.get);
router.put('/user/:username', userController.validate('validateUserInfo'), userController.update);
router.post('/user', userController.validate('validateUserInfo'), userController.create);
router.delete('/user/:username',userController.delete);
module.exports = router;
