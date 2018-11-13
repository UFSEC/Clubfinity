var userDAO = require('../DAO/UserDAO');
exports.get = (req,res)=>{
    console.log(`API GET request called for ${req.params.id}`);
    userDAO.getUser(req.params.id,(object,result)=>{
        if(result){
            res.json(result);
        }
        else{
            res.status(404).send(`User with username ${req.params.id} not found`);
        }
    });
};
exports.update = (req,res)=>{
    const params = req.query;
    if(Object.keys(params).length!=0){
        console.log(`API PUT request called for ${req.params.id}`);
        userDAO.getUser(req.params.id,(object,result)=>{
            if(result){
                for(var entry in params){
                    if(!Object.keys(result[0]).includes(entry)){
                        res.status(404).send(`User has no attritube of ${entry}`);
                        return;
                    }
                }
                for(var entry in params){
                    userDAO.updateUser(req.params.id,entry,params[entry]);
                }
                res.status(204).send();
            }
            else{
                res.status(404).send(`User with username ${req.params.id} not found`)
            }
        });
    }
    else{
        res.status(404).send('No query string passed into request; Must include parameters to be updated');
    }
};
exports.create = (req,res)=>{
    const params = req.query;
    if(Object.keys(params).length==6){ // <=CHANGE THIS LATER I DON'T LIKE MAGIC NUMBERS
        userDAO.createUser(params['fname'],params['lname'],params['dateOfBirth'],params['email'],params['username'],params['password']);
        res.status(201).send('User created successfully');
    }
    else{
        res.status(404).send('Insufficient parameters provided');
    }
};
exports.delete = (req,res)=>{
    userDAO.getUser(req.params.id,(result)=>{
        if(result){
            userDAO.deleteUser(req.params.id);
            res.status(204).send('User successfully deleted');
        }
        else{
            res.status(404).send(`User with username ${req.params.id} not found`);
        }
    });
};