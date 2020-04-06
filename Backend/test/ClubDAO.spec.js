process.env.NODE_ENV = 'test';

const clubDAO = require('../DAO/ClubDAO');
const chai = require('chai');
chai.should();

describe('ClubDAO', () => {
  beforeEach(async () => {
    await clubDAO.deleteAll()
  });

  describe('getAll', () => {
    it('should return a promise of all clubs', async () => {
      const clubParams = {
        name: 'Woodworking Club',
        admins: [],
        facebook_link: "http://facebook.com/woodworking",
        description: "We cut wood",
        category: "Engineering",
      };
      await clubDAO.create(clubParams);

      const clubs = await clubDAO.getAll();

      clubs.should.have.length(1);
      clubs[0].should.deep.include(clubParams);
    });
  });

  describe('get', () => {
    it('should return a promise of a club', async () => {
      const clubParams = {
        name: 'Woodworking Club',
        admins: [],
        facebook_link: "http://facebook.com/woodworking",
        description: "We cut wood",
        category: "Engineering",
      };
      const newClub = await clubDAO.create(clubParams);

      const club = await clubDAO.get(newClub._id);
      club.should.deep.include(clubParams);
    });
  });

  describe('update', () => {
    it('should update an existing club', async () => {
      const oldClubParams = {
        name: 'Woodworking Club',
        admins: [],
        facebook_link: "http://facebook.com/woodworking",
        description: "We cut wood",
        category: "Engineering",
      };

      const oldClub = await clubDAO.create(oldClubParams);

      const updatedClubParams = {
        name: 'Woodworking Club',
        admins: [],
        facebook_link: "http://facebook.com/woodworking",
        description: "DescriptionWoodworking is the activity or skill of making items from wood, and includes cabinet making, wood carving, joinery, carpentry, and woodturning",
        category: "Engineering",
      };

      await clubDAO.update(oldClub._id, updatedClubParams);

      const newClub = await clubDAO.get(oldClub._id);

      newClub.should.deep.include(updatedClubParams)
    });
  });

  describe('delete', () => {
    it('should delete a club by id', async () => {
      const clubParams = {
        name: 'Woodworking Club',
        president_name: 'Bob',
        admins: [],
        major_of_interest: 'Computer Science',
        email: 'wood@working.com',
        password: 'password',
        events: []
      };
      const newClub = await clubDAO.create(clubParams);
      await clubDAO.delete(newClub._id);
      const clubs = await clubDAO.getAll();
      clubs.should.have.length(0);
    })

  })
});
