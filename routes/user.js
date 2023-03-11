const express = require("express");
const { register } = require("../models/user");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      req.login(registerUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to KT Camp!!!");
        res.redirect("/");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    // do this
    if (err) {
      return next(err);
    } // do this
    req.flash("success", "Goodbye! Hope to See You Again");
    res.redirect("/");
  });
});
module.exports = router;
