const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const userDAO = require('../DAO/UserDAO');
const { validatePasswordHash } = require('../util/authUtil');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../Config/config');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    ((email, passwordAttempt, done) => {
      userDAO
        .getByEmail(email)
        .then((userModel) => {
          if (userModel) {
            if (validatePasswordHash(userModel, passwordAttempt)) {
              return done(null, userModel, {
                message: 'Logged in successfully',
              });
            }
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, false, {
            message: 'User not found with that email.',
          });
        })
        .catch((error) => {
          console.warn(error);
          done(null, false, {
            message: 'User not found with that email.',
          });
        });
    }),
  ),
);

passport.use(
  'loggedIn',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
      passReqToCallback: true,
    },
    async (req, jwtPayload, done) => {
      req.userId = jwtPayload.id;
      if (userDAO.get(jwtPayload.id)) {
        return done(null, true);
      }
      return done('Invalid token?');
    },
  ),
);
