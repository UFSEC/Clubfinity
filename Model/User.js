function User(firstname_, lastname_, day_, month_, year_, email_, username_, password_){
    var name = {
        first: firstname_,
        last:  lastname_
    };
    var dob = {
        day: day_,
        month: month_,
        year: year_
    };
    var username = username_;
    var email = email_;
    var password = password_;
    this.getName = () => name,
    this.getDOB = () => dob,
    this.getUsername = () => username,
    this.getEmail = () => email,
    this.getPassword = () => password,
    this.setLastName = (lastName) => {
        name.last = lastName;
    },
    this.setFirstName = (firstName) => {
        name.first = firstName;
    },
    this.setDOB = (newDOB) => {
        dob = newDOB;
    },
    this.setUsername = (newUsername) => {
        username = newUsername;
    },
    this.setEmail = (newEmail) => {
        email = newEmail;
    },
    this.setPassword = (newPassword) => {
        password = newPassword;
    }
}

exports.init = User;
