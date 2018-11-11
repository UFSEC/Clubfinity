function Person(lastname, firstname, day, month, year, email, username, password){
    this.name = {
        'first': firstname,
        'last':  lastname
    };
    this.dob = {
        'day': day,
        'month': month,
        'year': year
    };
    this.email = email;
    this.username = username;
    this.password = password;
}

var person1 = new Person('Mbionwu','Chimeziri',24,10,2000,'mbionwuc@ufl.edu','nna899','upgrades7');
console.log("Name: " + person1.name.last + ',' + person1.name.first + '\n');