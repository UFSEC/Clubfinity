//Test
function UserDAO(){
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "password",
    database: "clubfinity"
  });

  return{
    createUser: function(user){
      con.connect(function(err) {
        if (err) throw error;
        console.log('Connected!');
        let query = `INSERT INTO users(fname,lname,dateOfBirth,email,username,password) VALUES(\'${user.getName().first}\',
        \'${user.getName().last}\',\'${user.getDOB().day.toString()+'/'+user.getDOB().month.toString()+'/'+user.getDOB().year.toString()}\',\'${user.getEmail()}\',\'${user.getUsername()}\',\'${user.getPassword()}\')`;
        con.query(query,function(err,result){
          if (err) throw err;
          console.log('Result: '+result);
        });
      });
    }
  }
}

var user = require('../Model/User.js');
var user1 = user.createUser('John','Doe',19,19,1999,'JohnDoe@yahoo.com','Jdoe01','DoeJ321');
// console.log('\''+user1.getDOB()['day']+'/'+user1.getDOB()['month']+'/'+user1.getDOB()['year']+'\'');
var userDAO = UserDAO();
userDAO.createUser(user1);