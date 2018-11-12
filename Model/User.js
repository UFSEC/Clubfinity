function User(lastname_, firstname_, day_, month_, year_, email_, username_, password_){
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
    return
    {
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
        setName: function(newName)
        {
          this.name = newName;
        },
        setDOB: function(newDOB)
        {
          this.dob = newDOB;
        },
        setUsername: function(newUsername)
        {
          this.username = newUsername;
        },
        setEmail: function(newEmail)
        {
          this.email = newEmail;
        },
        setPassword: function(newPassword)
        {
          this.password = newPassword;
        }
    }
}
