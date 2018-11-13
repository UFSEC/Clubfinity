var express = require('express');
var userDAO = require('./DAO/UserDAO');
var app = express();
const port = 8080;
app.get('/GetUser/:id',(req,res)=>{
    var u = new userDAO.init();
    console.log(`API GET request called for ${req.params.id}`);
    u.getUser(req.params.id,(object,result)=>{
        if(result){
            res.json(result);
        }
        else{
            res.status(404).send(`User with username ${req.params.id} not found`);
        }
    });
})
app.put('/UpdateUser/:id',(req,res)=>{
    var u = new userDAO.init();
    console.log(`API PUT request called for ${req.params.id}`);
    u.getUser(req.params.id,(object,result)=>{
        if(result){
            const params = req.query;
            for(var entry in params){
                if(!Object.keys(result[0]).includes(entry)){
                    res.status(404).send(`User has no attritube of ${entry}`);
                    return;
                }
            }
            for(var entry in params){
                u.updateUser(req.params.id,entry,params[entry]);
            }
            res.status(200).send();
        }
        else{
            res.status(404).send(`User with username ${req.params.id} not found`)
        }
    })
})
app.listen(port,'localhost',()=>{
    console.log(`Now listening on port ${port}`);
})