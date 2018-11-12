function Event(name, club_id, location, moi, information,eventdate, clubname)
{
    this.name = name;
    this.club_id = club_id;
    this.location = location;
    this.moi = moi;
    this.information = information;
    this.eventdate = eventdate;
    this.clubname = clubname;
    return
    {
      getName: function()
      {
        return name;
      },
      getClub_Id: function()
      {
        return club_id;
      },
      getLocation: function()
      {
        return location;
      },
      getMoi: function()
      {
        return moi;
      },
      getInformation: function()
      {
        return information;
      },
      getEventDate: function()
      {
        return eventdate;
      },
      getClubName: function()
      {
        return clubname;
      }
    }
}
