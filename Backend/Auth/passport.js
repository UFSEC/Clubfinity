const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const userDAO = require('../DAO/UserDAO');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../Config/config');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    ((username, password, done) => {
      userDAO
        .getByUsername(username)
        .then((userModel) => {
          if (userModel) {
            if (userModel.password === password) {
              return done(null, userModel, {
                message: 'Logged in successfully',
              });
            }
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, false, {
            message: 'User not found with that username.',
          });
        })
        .catch((error) => {
          console.warn(error);
          done(null, false, {
            message: 'User not found with that username',
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
