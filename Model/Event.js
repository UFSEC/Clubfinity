exports.init = function Event(name_, club_id_, location_, major_of_interest_, description_, date_, club_name_)
{
    var name = name_;
    var club_id = club_id_;
    var location = location_;
    var major_of_interest = major_of_interest_;
    var description = description_;
    var date = date_;
    var club_name = club_name_;
    this.getName = ()=>name;
    this.getClubId = ()=>club_id;
    this.getLocation = ()=>location;
    this.getMajorOfInterest = ()=>major_of_interest;
    this.getDescription = ()=>description;
    this.getDate = ()=>date;
    this.getClubName = ()=>club_name;
    this.setName = (newName)=>{
      name = newName;
    }
    this.setClubId = (newId)=>{
      club_id = newId;
    }
    this.setLocation = (newLocation)=>{
      location = newLocation;
    }
    this.setMajorOfInterest = (newInterest)=>{
      major_of_interest = newInterest;
    }
    this.setDescription = (newDescription)=>{
      description = newDescription;
    }
    this.setDate = (newDate)=>{
      date = newDate;
    }
    this.setClubName = (newName)=>{
      club_name = newName;
    }
}
