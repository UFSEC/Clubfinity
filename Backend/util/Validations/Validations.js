exports.validateYear = function () {
    if (year === '') {
      throw new Error('Year cannot be empty');
    } else if (Number.isNaN(Number(year))) {
      throw new Error('Year must be a number');
    }
    return true;
  }
  
  exports.validatePassword = function () {
    if (password.length < 6) {
      throw new Error('Password is too short (less than 6 characters)');
    }
    return true;
  }
  exports.validateUsername = function () {
    if (user.length < 6) {
      throw new Error('Username is too short (less than 6 characters)');
    }
    if (user.length > 20) {
      throw new Error('Username is too long (more than 20 characters)');
    }
    if (user.indexOf(' ') !== -1) {
      throw new Error('Username contains a space');
    }
    return true;
  }

  exports.validateName = function (){
    
      var regex = /^[a-zA-Z()]+$/;
      if (regex.test(name)) {
        return true;
      }
      throw new Error('Name contains invalid characters');
    
  }