var userController = require('../Controllers/UserController');
var express = require('express');
var router = express.Router();
router.get('/user.info/:id',userController.get);
router.put('/user.update/:id',userController.update);
router.post('/user.create/',userController.create);
router.delete('/user.delete/:id',userController.delete);
module.exports = router;