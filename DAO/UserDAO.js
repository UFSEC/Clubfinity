//Test
function UserDAO(){
  this.users = [];
  var mysql = require('mysql');

  var conn = mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "password",
    database: "clubfinity"
  });

  return{
    createUser: (user)=>{
      conn.connect((err) =>{
        if (err) throw error;
        console.log('Connected!');
        let query = `INSERT INTO users(fname,lname,dateOfBirth,email,username,password) VALUES(\'${user.getName().first}\',
        \'${user.getName().last}\',\'${user.getDOB().day.toString()+'/'+user.getDOB().month.toString()+'/'+user.getDOB().year.toString()}\',\'${user.getEmail()}\',\'${user.getUsername()}\',\'${user.getPassword()}\')`;
        conn.query(query,(err,result)=>{
          if (err) throw error;
          console.log('Result: '+result);
        });
      });
    },
    getUsers: (username,callback)=>{
      var User = require('../Model/User.js');
      conn.connect((err)=>{
        if(err) throw error;
        console.log("Connected!");
        let query = (username===undefined)?`SELECT * FROM users`:`SELECT * FROM users WHERE username = \'${username}\'`;
        conn.query(query, (err,result)=>{
          if(err) throw error;
          console.log(result);
          // const [fname,lname,dateOfBirth,email,username,password] = result[0];
          // callback(User.init(fname,lname,...dateOfBirth.split("/"),email,username,password));
        });
      });
    },
    updateUser: (username, column, value) =>{
      conn.connect((err)=>{
        if(err) throw error;
        console.log("Connected!");
        let query = `UPDATE users SET ${column} = \'${value}\' WHERE username = \'${username}\'`;
        conn.query(query, (err,results)=>{
          if(err) throw error;
          console.log(`Successfully updated column \'${column}\' of user \'${username}\' with value \'${value}\'`);
          console.log(results);
        });
      });
    },
    deleteUser: (username) =>{
      conn.connect((err)=>{
        if(err) throw error;
        console.log("Connected!");
        let query = `DELETE FROM users WHERE username = \'${username}\'`;
        conn.query(query,(err,results) => {
          if(err) throw error;
          console.log(`\'${username} successfully deleted from the database`);
          console.log(results);
        })
      })
    }
  }
}
exports.init = UserDAO;