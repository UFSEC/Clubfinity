const chai = require('chai');
const chaiHttp = require('chai-http');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const authUtil = require('../util/authUtil');
const { TestHttp, isOk, isNotOk } = require('./testHelper');
const { INVALID_TOKEN } = require('../util/notificationUtil');

chai.should();
const app = require('../app');

chai.use(chaiHttp);

const currentUserParams = {
  name: { first: 'Current', last: 'User' },
  major: 'Computer Science',
  year: 2021,
  email: 'current@user.com',
  password: 'password',
};

let currentUser = null;
let http = null;

const fakeId = '5dba44f05b88ed1602589e84';

describe('Users', () => {
  beforeEach(async () => {
    await userDAO.deleteAll();

    currentUser = await userDAO.create(currentUserParams);
    const currentUserToken = authUtil.tokanizeUser(currentUser);
    http = new TestHttp(chai, app, currentUserToken);
  });

  describe('GET /users/', async () => {
    it('returns current user', async () => {
      const resp = await http.get('/api/users/');
      isOk(resp);

      const responseData = resp.body.data;
      const limitedUserModel = {
        ...currentUserParams,
        settings: {
          eventNotifications: 'enabled',
          announcementNotifications: 'enabled',
          eventReminderNotifications: '1',
        },
      };
      delete limitedUserModel.password;
      responseData.should.deep.include(limitedUserModel);
    });
  });

  describe('POST /users', async () => {
    let newUserData = null;

    beforeEach(async () => {
      newUserData = {
        name: { first: 'New', last: 'User' },
        major: 'Computer Science',
        year: 2021,
        email: 'new@ufl.edu',
        password: 'password',
      };
    });

    it('should create a user and return it', async () => {
      const resp = await http.post('/api/users', newUserData);
      isOk(resp);

      const { data } = resp.body;
      delete newUserData.password;

      data.should.deep.include(newUserData);
      data.should.include.all.keys('_id', 'clubs');
    });

    it('should create a user with no pushToken', async () => {
      const resp = await http.post('/api/users', newUserData);
      isOk(resp);

      const user = await userDAO.get(resp.body.data._id);
      user.pushToken.should.equal(INVALID_TOKEN);
    });

    it('should create a password hash when creating a new user', async () => {
      const resp = await http.post('/api/users', newUserData);
      isOk(resp);

      const databaseUser = await userDAO.get(resp.body.data._id);
      databaseUser.password.should.include.all.keys('hash', 'salt');
    });

    it('should return an error if email field is an empty string', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: '',
        password: 'password123',
      };
      await userDAO.create(userData);

      const resp = await http.post('/api/users', userData);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(2);
      errorMessages.should.include.all.members([

        'Email does not exist or is invalid',
        'Email does not exist or is invalid',

      ]);
    });

    it('should return an error is email field does not have @ufl.edu', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'jakepaul773',
        password: 'password123',
      };

      await userDAO.create(userData);

      const resp = await http.post('/api/users', userData);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(2);
      errorMessages.should.include.all.members([

        'Email does not exist or is invalid',
        'Email does not exist or is invalid',

      ]);
    });

    it('should return an error if any field is missing', async () => {
      const incompleteUserData = {};

      const resp = await http.post('/api/users', incompleteUserData);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(10);

      errorMessages.should.include.all.members([
        'First name does not exist',
        'Last name does not exist',
        'Year does not exist or is invalid',
        'Major does not exist or is invalid',
        'Email does not exist or is invalid',
        'Password does not exist',
      ]);
    });

    it('should return an error if the password is too short', async () => {
      const shortPassword = {
        name: { first: 'Jimmy', last: 'John' },
        major: 'Computer Science',
        year: 2021,
        email: 'jimmy@ufl.edu',
        password: 'short',
      };

      it('should return an error when there are invalid characters in the name', async () => {
        const invalidCharacter = {
          name: { first: 'Bi7lly', last: 'Johnson' },
          major: 'Accounting',
          year: 2024,
          email: 'billy101@ufl.edu',
          password: 'password12',
        };

        const resp = await http.post('/api/users', invalidCharacter);
        isNotOk(resp, 422);

        resp.body.validationErrors.should.have.length(1);
        resp.body.validationErrors[0].msg.should.equal('Name contains invalid characters');
      });

      const resp = await http.post('/api/users', shortPassword);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(1);
      errorMessages.should.include.all.members([
        'Password is too short (less than 6 characters)',
      ]);
    });

    it('should return an error when the year is incorrectly formatted', async () => {
      const incorrectDateFormat = {
        name: { first: 'Jimmy', last: 'John' },
        year: 'not a year',
        email: 'jimmyjohn@ufl.edu',
        major: 'Computer Science',
        password: 'password123',
      };

      const resp = await http.post('/api/users', incorrectDateFormat);
      isNotOk(resp, 422);

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Year must be a number');
    });
  });

  describe('PUT /users', async () => {
    it('should update a user and return the updated version', async () => {
      const newUserData = {
        name: { first: 'DifferentFirst', last: 'DifferentLast' },
        major: 'Computer Science',
        year: 2021,
        email: 'different@ufl.edu',
        password: 'diffpassword',
        pushToken: 'INVALID',
        clubs: [],
        settings: { eventNotifications: 'enabled', announcementNotifications: 'disabled', eventReminderNotifications: '12' },
      };

      const resp = await http.put('/api/users/', newUserData);
      isOk(resp);

      const expectedUserData = (await userDAO.getByEmail(newUserData.email)).toObject();

      delete expectedUserData._id;
      delete expectedUserData.__v;

      newUserData.should.deep.equal(expectedUserData);
    });
  });

  describe('Club Operations', async () => {
    const baseClubParams = {
      name: 'Club Club',
      admins: [],
      facebookLink: 'facebook',
      description: 'This is a club',
      category: 'Computer Science',
      events: [],
    };

    describe('PATCH /users/clubs', async () => {
      it('should add a club to the list of followed clubs for the current user', async () => {
        const club = await clubDAO.create(baseClubParams);
        const jsonClub = JSON.parse(JSON.stringify(club));

        const resp = await http.patch(`/api/users/clubs/${club._id}?follow=true`);
        isOk(resp);
        resp.body.data.clubs.should.deep.include(jsonClub);

        // Re-fetch user info to verify that the change persisted
        const userResp = await http.get('/api/users');
        userResp.body.data.clubs.should.deep.include(jsonClub);
      });

      it('should do nothing if it is called twice with the same club', async () => {
        const club = await clubDAO.create(baseClubParams);
        const jsonClub = JSON.parse(JSON.stringify(club));

        const resp = await http.patch(`/api/users/clubs/${club._id}?follow=true`);
        isOk(resp);
        resp.body.data.clubs.should.have.length(1);
        resp.body.data.clubs.should.deep.include(jsonClub);

        const resp2 = await http.patch(`/api/users/clubs/${club._id}?follow=true`);
        isOk(resp2);
        resp2.body.data.clubs.should.have.length(1);
        resp2.body.data.clubs.should.deep.include(jsonClub);
      });

      it('should return an error if the clubId does not exist', async () => {
        const resp = await http.patch(`/api/users/clubs/${fakeId}?follow=true`);
        isNotOk(resp, 422);

        resp.body.validationErrors.should.have.length(1);
        resp.body.validationErrors[0].msg.should.equal('Invalid Club ID. Club does not exist.');
      });

      it('should remove a club from the list of followed clubs for the current user', async () => {
        const club = await clubDAO.create(baseClubParams);
        currentUser.clubs.push(club);
        currentUser.save();

        const resp = await http.patch(`/api/users/clubs/${club._id}?follow=false`);
        isOk(resp);
        resp.body.data.clubs.should.be.empty;

        // Re-fetch user info to verify that the change persisted
        const userResp = await http.get('/api/users');
        isOk(userResp);
        userResp.body.data.clubs.should.be.empty;
      });

      it('should do nothing if it is called twice with the same club', async () => {
        const { _id: clubId } = await clubDAO.create(baseClubParams);
        currentUser.clubs.push(clubId);
        currentUser.save();

        const resp = await http.patch(`/api/users/clubs/${clubId}?follow=false`);
        isOk(resp);
        resp.body.data.clubs.should.be.empty;

        const resp2 = await http.patch(`/api/users/clubs/${clubId}?follow=false`);
        isOk(resp2);
        resp2.body.data.clubs.should.be.empty;
      });
    });
  });

  describe('Update pushToken', async () => {
    describe('PATCH /users/push-token', async () => {
      let user = null;
      let testPushToken = null;
      beforeEach(async () => {
        testPushToken = 'test_token';
        const resp = await http.patch(`/api/users/push-token?pushToken=${testPushToken}`);
        isOk(resp);

        user = await userDAO.get(currentUser._id);
      });

      it('should update pushToken of logged in user', async () => {
        user.pushToken.should.equal(testPushToken);
      });

      it('should get userToken from clubId', async () => {
        const baseClubParams = {
          name: 'Club Club',
          admins: [],
          facebookLink: 'facebook',
          description: 'This is a club',
          category: 'Computer Science',
          events: [],
        };

        const club = await clubDAO.create(baseClubParams);
        user.clubs = [club._id];
        await userDAO.update(user._id, user);

        const updatedPushToken = await userDAO.getPushTokens(club._id);
        updatedPushToken.should.deep.equal([testPushToken]);
      });
    });
  });

  describe('Settings', async () => {
    describe('PATCH /user-settings', async () => {
      it('should update the user settings', async () => {
        const resp = await http.patch('/api/users/user-settings?eventNotifications=disabled&announcementNotifications=disabled&eventReminderNotifications=never');

        isOk(resp);

        const userFromDatabase = await userDAO.get(currentUser._id);

        userFromDatabase.settings.eventNotifications.should.equal('disabled');
        userFromDatabase.settings.announcementNotifications.should.equal('disabled');
        userFromDatabase.settings.eventReminderNotifications.should.equal('never');
      });

      it('should not override unchanged settings', async () => {
        const resp = await http.patch('/api/users/user-settings?eventReminderNotifications=3');
        isOk(resp);

        const userFromDatabase = await userDAO.get(currentUser._id);

        userFromDatabase.settings.eventNotifications.should.equal('enabled');
        userFromDatabase.settings.announcementNotifications.should.equal('enabled');
        userFromDatabase.settings.eventReminderNotifications.should.equal('3');
      });

      it('should return an error when the query params are invalid', async () => {
        const resp = await http.patch('/api/users/user-settings?eventNotifications=enabled&announcementNotifications=invalid');

        isNotOk(resp, 422);

        resp.body.error.should.equal('Input validation failure');
        resp.body.validationErrors.should.have.lengthOf(1);
        resp.body.validationErrors[0].msg.should.equal('Invalid announcement notifications setting');
      });

      it('should return an error if no valid query params are given', async () => {
        const resp = await http.patch('/api/users/user-settings');

        isNotOk(resp, 422);

        resp.body.error.should.equal('Input validation failure');
        resp.body.validationErrors.should.have.lengthOf(1);
        resp.body.validationErrors[0].msg.should.equal('No parameters given');
      });
    });
  });
});
