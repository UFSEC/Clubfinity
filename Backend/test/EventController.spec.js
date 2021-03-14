const { DateTime } = require('luxon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const eventDAO = require('../DAO/EventDAO');
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

const clubNotFollowingParams = {
  name: 'Not Following',
  admins: [],
  facebookLink: 'facebook',
  description: 'This is a club',
  category: 'Computer Science',
};

const baseEventParams = {
  name: 'Event',
  location: 'Marston',
  description: 'This is an event',
  date: DateTime.local(2020, 1, 1),
  club: '',
  goingUsers: [],
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

  describe('GET /clubs/', async () => {
    it('get all events by club', async () => {
      const club = await clubDAO.create(clubParams);
      const event = await eventDAO.create({
        ...baseEventParams,
        name: 'In month',
        date: DateTime.local(2020, 1, 1),
        club,
      });
      // Populating event.club since the response to /api/event/club
      // will also have populated event.club
      event.populate('club', (err) => console.log(err));

      const resp = await http.get(`/api/events?filterBy=club&clubId=${club._id}`);
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(1);
      // event.id is of type ObjectId, response has string representation of ObjectId
      // Used JSON.parse to be able to compare ObjectId
      // and with the string representation successfully
      data.should.deep.include(JSON.parse(JSON.stringify(event)));
    });
  });

  describe('GET events for month', async () => {
    beforeEach(async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      const { _id: notFollowingClubId } = await clubDAO.create(clubNotFollowingParams);

      await userDAO.update(currentUser._id, {
        clubs: [
          clubId,
        ],
      });

      await eventDAO.create({
        ...baseEventParams,
        name: 'In month',
        date: DateTime.local(2020, 1, 1),
        club: clubId,
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Another in month',
        date: DateTime.local(2020, 1, 31),
        club: clubId,
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Previous month',
        date: DateTime.local(2019, 12, 1),
        club: clubId,
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Next month',
        date: DateTime.local(2020, 2, 10),
        club: clubId,
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Not following',
        date: DateTime.local(2020, 1, 2),
        club: notFollowingClubId,
      });
      await eventDAO.create({
        ...baseEventParams,
        name: 'Going event',
        date: DateTime.local(2020, 1, 3),
        club: notFollowingClubId,
        goingUsers: [
          currentUser._id,
        ],
      });
    });

    it('should return all events for the given month by default', async () => {
      const resp = await http.get('/api/events?filterBy=month&date=2020-01-01');
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(4);
      data.map((e) => e.name).should.have.members([
        'In month',
        'Another in month',
        'Not following',
        'Going event',
      ]);
    });

    it('should return all events for the given month when filter = all', async () => {
      const resp = await http.get('/api/events?filterBy=month&date=2020-01-01&filter=all');
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(4);
      data.map((e) => e.name).should.have.members([
        'In month',
        'Another in month',
        'Not following',
        'Going event',
      ]);
    });

    it('should only return followed events when filter = followed', async () => {
      const resp = await http.get('/api/events?filterBy=month&date=2020-01-01&filter=following');
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(2);
      data.map((e) => e.name).should.have.members([
        'In month',
        'Another in month',
      ]);
    });

    it('should only return the events the current user marked as going when filter = going', async () => {
      const resp = await http.get('/api/events?filterBy=month&date=2020-01-01&filter=going');
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(1);
      data.map((e) => e.name).should.have.members([
        'Going event',
      ]);
    });

    it('should return an error code if the given filter does not exist', async () => {
      const resp = await http.get('/api/events?filterBy=month&date=2020-01-01&filter=doesnotexist');
      isNotOk(resp, 400);

      resp.body.error.should.equal('Filter \'doesnotexist\' does not exist');
    });
  });

  describe('GET /following', async () => {
    it('should return all events that the user is following', async () => {
      const { _id: clubId } = await clubDAO.create(clubParams);
      await userDAO.update(currentUser._id, {
        clubs: [
          clubId,
        ],
      });
      await eventDAO.create({ ...baseEventParams, club: clubId });

      const resp = await http.get('/api/events?filterBy=userId');
      isOk(resp);

      const { data } = resp.body;
      data.should.have.length(1);
      data[0].name.should.equal('Event');
    });
  });

  describe('POST /', async () => {
    it('should be able to create a new event', async () => {
      clubParams.admins = [currentUser._id];
      const { _id: clubId } = await clubDAO.create(clubParams);
      const eventParams = {
        ...baseEventParams,
        club: clubId,
      };
      const resp = await http.post('/api/events', eventParams);

      isOk(resp);

      const { _id: eventId } = resp.body.data;
      const event = await eventDAO.get(eventId);
      event.should.not.be.null;
    });
  });
});
