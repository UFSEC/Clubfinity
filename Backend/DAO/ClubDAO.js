const Club = require('../Model/Club.js').Model;

exports.createClub = (name_,president_name_,admins_,major_of_interest_,email_,password_,events_)=>{
    const newClub = Club({
        name:name_,
        president_name:president_name_,
        admins: admins_,
        major_of_interest:major_of_interest_,
        email:email_,
        password:password_,
        events:(events_)?events_:[]
    });
    newClub.save((err,document)=>{
        if(err) throw err;
    });
}

exports.getAllClubs = (callback)=>{
    if(!callback) throw Error("Must have a callback function");
    Club.findAll({},(err,clubs)=>{
        if(err) throw err;
        callback(clubs);
    })
}

exports.getClub = (name_, callback)=>{
    if(!callback) throw Error("Must have a callback");
    Club.findOne({name:name_},(err,club)=>{
        if(err) throw err;
        callback(club);
    })
}

exports.updateClub = (name_, updatedInfo) => {
    Club.findOneAndUpdate({ name: name_ },updatedInfo,{ upsert: true },(err, document)=>{
        if (err) throw err;
      }
    );
  };

  exports.deleteClub = (name_) => {
    Club.remove({ name: name_ }, (err)=>{
        if(err) throw err;
    });
  };
  