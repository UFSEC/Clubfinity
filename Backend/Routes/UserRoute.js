const userController = require("../Controllers/UserController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

// TODO:
// Authorization

router.get("/user", passport.authenticate("loggedIn", { session: false }), userController.getAll);
router.get("/user/:username", passport.authenticate("loggedIn", { session: false }), userController.get);
router.put("/user/:username", passport.authenticate("loggedIn", { session: false }), userController.validate("validateUserInfo"), userController.update);
router.post("/user", passport.authenticate("loggedIn", { session: false }), userController.validate("validateUserInfo"), userController.create);
router.delete("/user/:username", passport.authenticate("loggedIn", { session: false }), userController.delete);

module.exports = router;
