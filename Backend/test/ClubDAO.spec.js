const chai = require('chai');
const chaiHttp = require('chai-http');
const clubDAO = require('../DAO/ClubDAO');
const userDAO = require('../DAO/UserDAO');

chai.should();
chai.use(chaiHttp);

require('../app');

describe('ClubDAO', () => {
  const baseClubParams = {
    name: 'Woodworking Club',
    thumbnailUrl: 'https://thumbnail.url',
    admins: [],
    facebookLink: 'facebook',
    instagramLink: 'instagram',
    slackLink: 'slack',
    description: 'This is a club',
    category: 'Crafts',
  };

  beforeEach(async () => {
    await clubDAO.deleteAll();
    await userDAO.deleteAll();
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
        facebookLink: 'http://facebook.com/other',
        instagramLink: 'http://instagram.com/other',
        slackLink: 'http://slack.com/other',
        description: 'This is not a club',
        category: 'Arts',
      };

      await clubDAO.update(oldClub._id, updatedClubParams);

      const newClub = await clubDAO.get(oldClub._id);

      newClub.should.deep.include(updatedClubParams);
    });
  });

  describe('delete', () => {
    it('should delete a club by id', async () => {
      const clubParams = {
        name: 'Woodworking Club',
        admins: [],
        email: 'wood@working.com',
        password: 'password',
      };
      const newClub = await clubDAO.create(clubParams);
      await clubDAO.delete(newClub._id);
      const clubs = await clubDAO.getAll();
      clubs.should.have.length(0);
    });
  });

  describe('admins', () => {
    let user = null;
    let club = null;

    beforeEach(async () => {
      user = await userDAO.create({
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'test@ufl.edu',
        password: 'password123',
      });
      club = await clubDAO.create({
        ...baseClubParams,
        admins: [user._id],
      });
    });

    it('should return all the clubs an admin is managing (getByAdminId)', async () => {
      const managedClubs = await clubDAO.getByAdminId(user._id);

      managedClubs.should.have.length(1);
      managedClubs[0].name.should.equal(baseClubParams.name);
    });
    it('should return true if user is adminitrator of club (isAdmin)', async () => {
      const isAdmin = await clubDAO.isAdmin(user._id, club._id);
      isAdmin.should.be.true;
    });
  });

  describe('create club with empty links', () => {
    it('should be able to create a club with instagram and slack fields empty', async () => {
      const clubParams = {
        name: 'Woodworking Club',
        thumbnailUrl: 'https://thumbnail.url',
        admins: [],
        facebookLink: 'facebook',
        instagramLink: null,
        slackLink: null,
        description: 'This is a club',
        category: 'Crafts',
      };
      const newClub = await clubDAO.create(clubParams);
      const club = await clubDAO.get(newClub._id);
      club.should.deep.include(clubParams);
    });
  });
});
