function UserDAO(){
  var mysql = require('mysql');

  var conn = mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "password",
    database: "clubfinity"
  });

  conn.connect((err) =>{
    if(err) throw (new Error(err));
    console.log('Connected!');
  });

  this.createUser = (user)=>{
    let query = `INSERT INTO users(fname,lname,dateOfBirth,email,username,password) VALUES(\'${user.getName().first}\',
    \'${user.getName().last}\',\'${user.getDOB().day.toString()+'/'+user.getDOB().month.toString()+'/'+user.getDOB().year.toString()}\',\'${user.getEmail()}\',\'${user.getUsername()}\',\'${user.getPassword()}\')`;
    conn.query(query,(err,result)=>{
      if (err) throw (new Error('Syntax error in query'));
      console.log(`Successfully added ${user.getUsername()} to the database`);
    });
  },
  this.getUser = (username_,callback)=>{
    if(!callback) throw(new Error('Second parameter must be a callback function'));
    var User = require('../Model/User.js');
    let query = `SELECT * FROM users WHERE username = \'${username_}\'`;
    conn.query(query, (err,result)=>{
      if (err) throw (new Error('Syntax error in query'));
      if(result[0]){
        console.log(`Successfully retrieved ${username_} from the database`);
        const {fname,lname,dateOfBirth,email,username,password} = result[0];
        callback(new User.init(fname,lname,...dateOfBirth.split("/"),email,username,password),result);
      }
      else{
        console.log(`Failed to retrieve ${username_} from database; User does not exist`)
        callback(null);
      }
    });
  },
  this.updateUser = (username, column, value) =>{
    let query = `UPDATE users SET ${column} = \'${value}\' WHERE username = \'${username}\'`;
    conn.query(query, (err,results)=>{
      if (err) throw (new Error('Syntax error in query'));
      console.log(`Successfully updated column \'${column}\' of user \'${username}\' with value \'${value}\'`);
    });
  },
  this.deleteUser = (username) =>{
    let query = `DELETE FROM users WHERE username = \'${username}\'`;
    conn.query(query,(err,results) => {
      if (err) throw (new Error('Syntax error in query'));
      console.log(`\'${username} successfully deleted from the database`);
    });
  }
}

exports.init = UserDAO;
