const { DateTime } = require('luxon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const announcementDAO = require('../DAO/AnnouncementDAO');
const authUtil = require('../util/authUtil');
const { TestHttp, isOk, isNotOk } = require('./testHelper');

chai.should();
chai.use(chaiHttp);

const app = require('../app');

const currentUserParams = {
  name: { first: 'Current', last: 'User' },
  year: 2021,
  major: 'Computer Science',
  email: 'current@user.com',
  username: 'currentuser',
  password: 'password',
};

let currentUser = null;

const clubParams = {
  name: 'Club Club',
  admins: [],
  facebookLink: 'facebook',
  description: 'This is a club',
  category: 'Computer Science',
};

const baseAnnouncementParams = {
  title: 'Event',
  description: 'This is an event',
  date: DateTime.local(2020, 10, 1),
  club: '',
};

let http = null;

describe('Announcements', () => {
  beforeEach(async () => {
    await userDAO.deleteAll();
    await clubDAO.deleteAll();
    await announcementDAO.deleteAll();

    currentUser = await userDAO.create(currentUserParams);
    clubParams.admins = [currentUser._id];
    const currentUserToken = authUtil.tokanizeUser(currentUser);
    http = new TestHttp(chai, app, currentUserToken);
  });

  describe('GET', async () => {
    let clubId1;
    let clubId2;

    beforeEach(async () => {
      clubId1 = (await clubDAO.create(clubParams))._id;
      clubId2 = (await clubDAO.create(clubParams))._id;
      const announcement1 = await announcementDAO.create({
        ...baseAnnouncementParams,
        title: 'Announcement 1',
        club: clubId1,
      });
      announcement1.populate('club', () => { });
      const announcement2 = await announcementDAO.create({
        ...baseAnnouncementParams,
        title: 'Announcement 2',
        club: clubId2,
      });
      announcement2.populate('club', () => { });
    });

    it('returns only announcements from a club', async () => {
      const resp = await http.get(`/api/announcements?filterBy=club&clubId=${clubId1}`);

      isOk(resp);
      resp.body.data.should.have.length(1);
      resp.body.data[0].title.should.equal('Announcement 1');
    });
  });

  describe('POST /', async () => {
    it('should be able to create a new announcement', async () => {
      clubParams.admins = [currentUser._id];
      const { _id: clubId } = await clubDAO.create(clubParams);
      const announcementParams = {
        ...baseAnnouncementParams,
        club: clubId,
      };

      const resp = await http.post('/api/announcements', announcementParams);

      isOk(resp);

      const { _id: announcementId } = resp.body.data;
      const announcementFromDb = await announcementDAO.get(announcementId);
      announcementFromDb.should.deep.include(announcementParams);
    });
  });

  describe('PUT /:id', async () => {
    it('should be able to update an existing announcement', async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      const announcementParams = {
        ...baseAnnouncementParams,
        club: clubId,
      };
      const oldAnnouncement = await announcementDAO.create(announcementParams);

      const newAnnouncementParams = {
        ...announcementParams,
        title: 'Different title',
        description: 'Different description',
      };

      const resp = await http.put(
        `/api/announcements/${oldAnnouncement._id}`,
        newAnnouncementParams,
      );

      isOk(resp);

      resp.body.data.should.deep.include({
        title: 'Different title',
        description: 'Different description',
      });

      const getResp = await http.get(`/api/announcements/${oldAnnouncement._id}`);

      isOk(getResp);

      getResp.body.data.should.deep.include({
        title: 'Different title',
        description: 'Different description',
      });
    });
  });

  describe('DELETE /:id', async () => {
    it('should delete a user and return it', async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      const announcementParams = {
        ...baseAnnouncementParams,
        club: clubId,
      };

      const announcement = await announcementDAO.create(announcementParams);

      const deleteResp = await http.delete(`/api/announcements/${announcement._id}`);

      isOk(deleteResp);

      const getResp = await http.get(`/api/announcements/${announcement._id}`);

      isNotOk(getResp, 404);
      getResp.body.error.should.contain('Id not found');
    });
  });
});
