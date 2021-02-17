exports.limitedUserModelFields = {
  _id: 1, name: 1, major: 1, year: 1,
};

exports.getLimitedUserData = (user) => ({
  name: user.name,
  _id: user._id,
  major: user.major,
  year: user.year,
  email: user.email,
  username: user.username,
  clubs: user.clubs,
});
