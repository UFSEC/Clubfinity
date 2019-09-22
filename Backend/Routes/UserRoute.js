var userController = require('../Controllers/UserController');
var express = require('express');
var router = express.Router();
router.get('/user',userController.getAll);
router.get('/user/:username',userController.get);
router.put('/user/:username',userController.update);
router.post('/user',userController.create);
router.delete('/user/:username',userController.delete);
module.exports = router;
