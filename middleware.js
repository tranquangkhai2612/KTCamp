module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // store the url users are currently at
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Please Sign in First!");
    return res.redirect("/login");
  }
  next();
};
