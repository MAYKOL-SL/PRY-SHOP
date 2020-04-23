const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await db.query("SELECT * FROM users WHERE username = ?", [
        username
      ]);
      const extractedErrors = []
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(
            null,
            user,
            req.flash("success_msg", "Welcome " + user.username)
          );
        } else {
          done(
            null,
            false,
            req.flash("error_msg", { text: "Incorrect Password" })
          );
        }
      } else {
        return done(
          null,
          false,
          req.flash("error_msg", { text: "The Username does not exists." })
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { email } = req.body;
      let newUser = {
        username,
        email,
        password
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await db.query("INSERT INTO users SET ? ", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
