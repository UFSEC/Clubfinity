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
    return{
        getName: () => name,
        getDOB: () => dob,
        getUsername: () => username,
        getEmail: () => email,
        getPassword: () => password,
        setLastName: (lastName) => {
            name.last = lastName;
        },
        setFirstName: (firstName) => {
            name.first = firstName;
        },
        setDOB: (newDOB) => {
            dob = newDOB;
        },
        setUsername: (newUsername) => {
            username = newUsername;
        },
        setEmail: (newEmail) => {
            email = newEmail;
        },
        setPassword: (newPassword) => {
            password = newPassword;
        }
    }
}
exports.init = User;
