const passport = require('passport');
const authUtil = require('../util/authUtil');

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
      return response.json({ token, user });
    });
    return false;
  })(request, response);
};
