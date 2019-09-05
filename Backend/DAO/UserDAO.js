var mysql = require('mysql');
var User = require('../Model/User.js');

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

exports.createUser = (firstname_,lastname_,dob_,email_,username_,password_)=>{
  let query = `INSERT INTO users(fname,lname,dateOfBirth,email,username,password) VALUES(\'${firstname_}\',
  \'${lastname_}\',\'${dob_}\',\'${email_}\',\'${username_}\',\'${password_}\')`;
  conn.query(query,(err,result)=>{
    if (err) throw (new Error('Syntax error in query'));
    console.log(`Successfully added ${username_} to the database`);
  });
},
exports.getAllUsers = (callback)=>{
  if(!callback) throw(new Error('Second parameter must be a callback function'));
  let query = 'SELECT * FROM users';
  conn.query(query,(err, result)=>{
    if(err) throw (new Error('Syntax error in query'));
    callback(result);
  });
},
exports.getUser = (username_,callback)=>{
  if(!callback) throw(new Error('Second parameter must be a callback function'));
  let query = `SELECT * FROM users WHERE username = \'${username_}\'`;
  conn.query(query, (err,result)=>{
    if (err) throw (new Error('Syntax error in query'));
    if(result[0]){
      console.log(`Successfully retrieved ${username_} from the database`);
      const {fname,lname,dateOfBirth,email,username,password} = result[0];
      callback(result,new User.init(fname,lname,...dateOfBirth.split("/"),email,username,password));
    }
    else{
      console.log(`Failed to retrieve ${username_} from database; User does not exist`)
      callback(null);
    }
  });
},
exports.updateUser = (username_, column, value) =>{
  let query = `UPDATE users SET ${column} = \'${value}\' WHERE username = \'${username_}\'`;
  conn.query(query, (err,results)=>{
    if (err) throw (new Error('Syntax error in query'));
    console.log(`Successfully updated column \'${column}\' of user \'${username_}\' with value \'${value}\'`);
  });
},
exports.deleteUser = (username_) =>{
  let query = `DELETE FROM users WHERE username = \'${username_}\'`;
  conn.query(query,(err,results) => {
    if (err) throw (new Error('Syntax error in query'));
    console.log(`\'${username_} successfully deleted from the database`);
  });
}
