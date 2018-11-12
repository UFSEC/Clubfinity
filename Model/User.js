exports.createUser = function User(firstname_, lastname_, day_, month_, year_, email_, username_, password_){
    var name = {
        'first': firstname_,
        'last':  lastname_
    };
    var dob = {
        'day': day_,
        'month': month_,
        'year': year_
    };
    var username = username_;
    var email = email_;
    var password = password_;
    return{
        
        getName: function(){
            return name;
        },
        getDOB: function (){
            return dob;
        },
        getUsername: function (){
            return username;
        },
        getEmail: function (){
            return email;
        },
        getPassword: function (){
            return password;
        },
        setLastName: function(lastName){
            name.last = lastName;
        },
        setFirstName: function(firstName){
            name.first = firstName;
        },
        setDOB: function(newDOB){
          dob = newDOB;
        },
        setUsername: function(newUsername){
          username = newUsername;
        },
        setEmail: function(newEmail){
          email = newEmail;
        },
        setPassword: function(newPassword){
          password = newPassword;
        }
    }
}