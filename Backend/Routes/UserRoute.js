const userController = require("../Controllers/UserController");
const express = require("express");
const router = express.Router();
const passport = require("passport");

// TODO:
// Authorization

router.get("/", passport.authenticate("loggedIn", { session: false }), userController.getAll);
router.get("/:id", passport.authenticate("loggedIn", { session: false }), userController.get);
router.post("/", userController.validate("validateUserInfo"), userController.create);
router.put("/:id", passport.authenticate("loggedIn", { session: false }), userController.validate("validateUserInfo"), userController.update);
router.put("/follow/:clubId", passport.authenticate("loggedIn", { session: false }), userController.validate("validateFollow"), userController.followClub);
router.put("/unfollow/:clubId", passport.authenticate("loggedIn", { session: false }), userController.unfollowClub);
router.delete("/:id", passport.authenticate("loggedIn", { session: false }), userController.delete);

module.exports = router;
