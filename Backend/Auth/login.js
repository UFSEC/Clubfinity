const passport = require('passport');
const authUtil = require('../util/authUtil');
const { getLimitedUserData } = require('../util/userUtil');

exports.authenticate = (request, response) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error || !user) {
      return response.status(400).json({
        error: info.message,
        user,
      });
    }
    request.login(user, { session: false }, (loginError) => {
      if (loginError) {
        response.send(loginError);
      }
      const token = authUtil.tokanizeUser(user);
      const userData = getLimitedUserData(user);
      return response.json({ token, user: userData });
    });
    return false;
  })(request, response);
};
