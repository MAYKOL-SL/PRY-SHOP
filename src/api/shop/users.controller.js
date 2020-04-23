const passport = require("passport");

function getUsersSignin(req, res) {
  res.render("users/signin");
}

function getUserSignup(req, res) {
  res.render("users/signup");
}

let login = (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/products",
    failureRedirect: "/users/signin",
    failureFlash: true
  })(req, res, next);
};

let addUser = (req, res, next) => {
  passport.authenticate("local.signup", {
    successRedirect: "/products",
    failureRedirect: "/users/signup",
    failureFlash: true
  })(req, res, next);
};

let logout = (req, res) => {
  req.logOut();
  res.redirect("/users/signin");
};

let getProfile = (req, res) => {
  res.render("users/profile");
};

module.exports = {
  getUsersSignin,
  getUserSignup,
  addUser,
  login,
  logout,
  getProfile
};
