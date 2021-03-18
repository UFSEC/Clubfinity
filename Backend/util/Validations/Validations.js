exports.validateYear = function (year) {
  if (year === '') {
    throw new Error('Year cannot be empty');
  } else if (Number.isNaN(Number(year))) {
    throw new Error('Year must be a number');
  }
  return true;
};

exports.validatePassword = function (password) {
  if (password.length < 6) {
    throw new Error('Password is too short (less than 6 characters)');
  }
  return true;
};

exports.validateName = function (name) {
  const regex = /^[a-zA-Z()]+$/;
  if (regex.test(name)) {
    return true;
  }
  throw new Error('Name contains invalid characters');
};
