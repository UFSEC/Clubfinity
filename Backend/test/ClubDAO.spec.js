process.env.NODE_ENV = 'test';

const clubDAO = require('../DAO/ClubDAO');
const chai = require('chai');
chai.should();

const baseClubParams = {
  name: 'Woodworking Club',
  admins: [],
  facebook_link: 'facebook',
  description: 'This is a club',
  category: 'Crafts',
  events: []
};

describe('ClubDAO', () => {
  beforeEach(async () => {
    await clubDAO.deleteAll()
  });

  describe('getAll', () => {
    it('should return a promise of all clubs', async () => {
      await clubDAO.create(baseClubParams);

      const clubs = await clubDAO.getAll();

      clubs.should.have.length(1);
      clubs[0].should.deep.include(baseClubParams);
    });
  });

  describe('get', () => {
    it('should return a promise of a club', async () => {
      const newClub = await clubDAO.create(baseClubParams);

      const club = await clubDAO.get(newClub._id);
      club.should.deep.include(baseClubParams);
    });
  });

  describe('update', () => {
    it('should update an existing club', async () => {
      const oldClub = await clubDAO.create(baseClubParams);

      const updatedClubParams = {
        name: 'Painting Club',
        admins: [],
        facebook_link: 'notfacebook',
        description: 'This is not a club',
        category: 'Arts',
        events: []
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
        admins: [],
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
