process.env.NODE_ENV = 'test';

const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const eventDAO = require('../DAO/EventDAO');
const authUtil = require('../util/authUtil');
const { TestHttp, isOk, isNotOk } = require('./testHelper');

const chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const app = require('../app');

const currentUserParams = {
  name: { first: 'Current', last: 'User' },
  dob: '2019-01-01',
  email: 'current@user.com',
  username: 'currentuser',
  password: 'password'
};

let currentUser = null;

const clubParams = {
  name: 'Club Club',
  admins: [],
  facebook_link: 'facebook',
  description: 'This is a club',
  category: 'Computer Science',
  events: []
};

const clubNotFollowingParams = {
  name: 'Not Following',
  admins: [],
  facebook_link: 'facebook',
  description: 'This is a club',
  category: 'Computer Science',
  events: []
};

const baseEventParams = {
  name: 'Event',
  location: 'Marston',
  major_of_interest: 'Computer Science',
  description: 'This is an event',
  date: '2020-01-01',
  club: '',
  goingUsers: []
};

let http = null;

describe('Events', () => {
  beforeEach(async () => {
    await userDAO.deleteAll();
    await clubDAO.deleteAll();
    await eventDAO.deleteAll();

    currentUser = await userDAO.create(currentUserParams);
    const currentUserToken = authUtil.tokanizeUser(currentUser);
    http = new TestHttp(chai, app, currentUserToken);
  });

  describe('GET /inMonth', async () => {
    beforeEach(async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      const { _id: notFollowingClubId } = await clubDAO.create(clubNotFollowingParams);

      await userDAO.update(currentUser._id, {
        clubs: [
          clubId
        ]
      });

      await eventDAO.create({
        ...baseEventParams,
        name: 'In month',
        date: '2020-01-01',
        club: clubId
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Another in month',
        date: '2020-01-31',
        club: clubId
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Previous month',
        date: '2019-12-01',
        club: clubId
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Next month',
        date: '2020-02-10',
        club: clubId
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Not following',
        date: '2020-01-02',
        club: notFollowingClubId
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Going event',
        date: '2020-01-03',
        club: notFollowingClubId,
        goingUsers: [
          currentUser._id
        ]
      })
    });

    it('should return all events for the given month by default', async () => {
      const resp = await http.get('/api/event/inMonth/2020-01-01');
      isOk(resp);

      const data = resp.body.data;
      data.should.have.length(4);
      data.map(e => e.name).should.have.members([
        'In month',
        'Another in month',
        'Not following',
        'Going event'
      ])
    });

    it('should return all events for the given month when filter = all', async () => {
      const resp = await http.get('/api/event/inMonth/2020-01-01?filter=all');
      isOk(resp);

      const data = resp.body.data;
      data.should.have.length(4);
      data.map(e => e.name).should.have.members([
        'In month',
        'Another in month',
        'Not following',
        'Going event'
      ])
    });

    it('should only return followed events when filter = followed', async () => {
      const resp = await http.get('/api/event/inMonth/2020-01-01?filter=following');
      isOk(resp);

      const data = resp.body.data;
      data.should.have.length(2);
      data.map(e => e.name).should.have.members([
        'In month',
        'Another in month'
      ])
    });

    it('should only return the events the current user marked as going when filter = going', async () => {
      const resp = await http.get('/api/event/inMonth/2020-01-01?filter=going');
      isOk(resp);

      const data = resp.body.data;
      data.should.have.length(1);
      data.map(e => e.name).should.have.members([
        'Going event'
      ])
    });

    it('should return an error code if the given filter does not exist', async () => {
      const resp = await http.get('/api/event/inMonth/2020-01-01?filter=doesnotexist');
      isNotOk(resp, 400);

      resp.body.error.should.equal('Filter \'doesnotexist\' does not exist')
    })
  });

  describe('GET /following', async () => {
    it('should return all events that the user is following', async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      await userDAO.update(currentUser._id, {
        clubs: [
          clubId
        ]
      });
      await eventDAO.create({ ...baseEventParams, club: clubId });

      const resp = await http.get(`/api/event/following`);
      isOk(resp);

      const data = resp.body.data;
      data.should.have.length(1);
      data[0].name.should.equal('Event');
    });
  });
});