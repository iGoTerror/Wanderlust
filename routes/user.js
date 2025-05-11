const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js")

router
    .route("/signup")
    .get(userController.signup)
    .post(wrapAsync(userController.signupPost));


router.route("/login")
    .get(userController.login)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.logpost);

router.get("/logout", (userController.logout));

module.exports = router;