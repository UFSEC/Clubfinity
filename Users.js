function Users(lastname_, firstname_, day_, month_, year_, email_, username_, password_){
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
    this.getName = function(){
        return name;
    };
    this.getDOB = function (){
        return dob;
    }
    this.getUsername = function (){
        return username;
    }
    this.getEmail = function (){
        return email;
    }
    this.getPassword = function (){
        return password;
    }

}
var person1 = new Users('Mbionwu','Chimeziri',24,10,2000,'mbionwuc@ufl.edu','nna899','upgrades7');
console.log("Name: " + person1.getName().last + ',' + person1.getName().first+ '\n');