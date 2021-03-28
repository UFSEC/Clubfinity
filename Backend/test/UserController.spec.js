const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { DateTime } = require('luxon');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const emailVerificationCodeDAO = require('../DAO/EmailVerificationCodeDAO');
const authUtil = require('../util/authUtil');
const {
  TestHttp,
  isOk,
  isNotOk,
  hasValidationErrors,
} = require('./testHelper');
const { INVALID_TOKEN } = require('../util/notificationUtil');

chai.should();
const app = require('../app');

chai.use(chaiHttp);

let http = null;

const fakeId = '5dba44f05b88ed1602589e84';

describe('Users', () => {
  beforeEach(async () => {
    await userDAO.deleteAll();
    await emailVerificationCodeDAO.deleteAll();
    await clubDAO.deleteAll();
  });

  describe('Account Creation', async () => {
    beforeEach(async () => {
      // Create mock email service in order to test sending emails without actually sending emails
      // for account registration endpoint
      global.emailService = { send: () => {} };

      http = new TestHttp(chai, app);
    });

    afterEach(async () => {
      sinon.restore();
    });

    const newUserData = {
      name: { first: 'New', last: 'User' },
      major: 'Computer Science',
      year: 2021,
      email: 'new@ufl.edu',
      password: 'password',
    };

    describe('registration', async () => {
      it('should create an inactive user', async () => {
        const resp = await http.post('/api/users/register', newUserData);
        isOk(resp);

        const { data } = resp.body;
        const newUserFromDatabase = await userDAO.get(data._id);

        newUserFromDatabase.name.first.should.equal('New');
        newUserFromDatabase.name.last.should.equal('User');
        newUserFromDatabase.active.should.be.false;
      });

      it('should create an email validation code and save it to the database', async () => {
        const resp = await http.post('/api/users/register', newUserData);

        const validationCodeRecord = await emailVerificationCodeDAO.get(
          resp.body.data._id,
        );

        validationCodeRecord.should.have.property('code').with.lengthOf(6);
        validationCodeRecord.should.have.property('user');
        validationCodeRecord.should.have.property('expirationTimestamp');
      });

      it('should send an email to the proper recipient', async () => {
        const mock = sinon.mock(global.emailService);

        mock.expects('send').once().withArgs(newUserData.email, 'Clubfinity Email Verification');

        await http.post('/api/users/register', newUserData);

        mock.verify();
      });

      it('should delete existing inactive user and associated verification codes if it shares the same email', async () => {
        const originalResp = await http.post('/api/users/register', newUserData);
        const existingInactiveUserId = originalResp.body.data._id;

        const resp = await http.post('/api/users/register', newUserData);
        isOk(resp);

        (await userDAO.exists(existingInactiveUserId)).should.be.false;
        (await emailVerificationCodeDAO.exists(existingInactiveUserId)).should.be.false;
      });

      it('should create a user with no pushToken', async () => {
        const resp = await http.post('/api/users/register', newUserData);
        isOk(resp);

        const user = await userDAO.get(resp.body.data._id);
        user.pushToken.should.equal(INVALID_TOKEN);
      });

      it('should create a password hash when creating a new user', async () => {
        const resp = await http.post('/api/users/register', newUserData);
        isOk(resp);

        const databaseUser = await userDAO.get(resp.body.data._id);
        databaseUser.password.should.include.all.keys('hash', 'salt');
      });

      it('should prevent a user from attempting to create an active user', async () => {
        const userData = {
          name: { first: 'Test', last: 'McTester' },
          major: 'Computer Science',
          year: 2021,
          email: 'test@ufl.edu',
          password: 'password123',
          active: true,
        };

        const resp = await http.post('/api/users/register', userData);
        isNotOk(resp, 422);
        hasValidationErrors(resp, 'Cannot set active flag');
      });

      it.only('should return an error if email is taken', async () => {
        const userData = {
          name: { first: 'Test', last: 'McTester' },
          major: 'Computer Science',
          year: 2021,
          email: 'test@ufl.edu',
          password: 'password123',
          active: true,
        };
        await userDAO.create(userData);

        const resp = await http.post('/api/users/register', userData);

        isNotOk(resp, 422);
        hasValidationErrors(resp, 'Email is already in use');
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

        const resp = await http.post('/api/users/register', userData);
        isNotOk(resp, 422);

        hasValidationErrors(resp, 'Email not given, invalid, or already exists');
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

        const resp = await http.post('/api/users/register', userData);
        isNotOk(resp, 422);

        hasValidationErrors(resp, 'Email not given, invalid, or already exists');
      });

      it('should return an error if any field is missing', async () => {
        const incompleteUserData = {};

        const resp = await http.post('/api/users/register', incompleteUserData);
        isNotOk(resp, 422);

        hasValidationErrors(resp, ([
          'First name does not exist',
          'Last name does not exist',
          'Year does not exist or is invalid',
          'Major does not exist or is invalid',
          'Email not given, invalid, or already exists',
          'Password not given',
        ]));
      });

      it('should return an error if the password is too short', async () => {
        const shortPassword = {
          name: { first: 'Jimmy', last: 'John' },
          major: 'Computer Science',
          year: 2021,
          email: 'jimmy@ufl.edu',
          password: 'short',
        };

        const resp = await http.post('/api/users/register', shortPassword);
        isNotOk(resp, 422);

        hasValidationErrors(resp, [
          'Password is too short (less than 6 characters)',
        ]);
      });

      it('should return an error when there are invalid characters in the name', async () => {
        const invalidCharacter = {
          name: { first: 'Bi7lly', last: 'Johnson' },
          major: 'Accounting',
          year: 2024,
          email: 'billy101@ufl.edu',
          password: 'password12',
        };

        const resp = await http.post('/api/users/register', invalidCharacter);
        isNotOk(resp, 422);

        hasValidationErrors(resp, 'Name contains invalid characters');
      });

      it('should return an error when the year is incorrectly formatted', async () => {
        const incorrectDateFormat = {
          name: { first: 'Jimmy', last: 'John' },
          year: 'not a year',
          major: 'Computer Science',
          email: 'jimmyjohn@ufl.edu',
          password: 'password123',
        };

        const resp = await http.post('/api/users/register', incorrectDateFormat);
        isNotOk(resp, 422);

        hasValidationErrors(resp, 'Year must be a number');
      });
    });

    describe('verification', async () => {
      let user;

      beforeEach(async () => {
        user = await userDAO.create(newUserData);
      });

      it('should activate the user after receiving valid code', async () => {
        await emailVerificationCodeDAO.create({
          user: user._id,
          code: '000000',
          expirationTimestamp: DateTime.local().plus({ minutes: 1 }),
        });

        const resp = await http.post('/api/users/verify', {
          userId: user._id,
          code: '000000',
        });

        isOk(resp);

        const userFromDatabase = await userDAO.get(resp.body.data._id);
        userFromDatabase.active.should.be.true;

        (await emailVerificationCodeDAO.exists(userFromDatabase._id)).should.be.false;
      });

      it('should return an error and the user should remain inactive after receiving an invalid code', async () => {
        await emailVerificationCodeDAO.create({
          user: user._id,
          code: '000000',
          expirationTimestamp: DateTime.local().plus({ minutes: 1 }),
        });

        const resp = await http.post('/api/users/verify', {
          userId: user._id,
          code: '999999',
        });

        isNotOk(resp, 400);

        resp.body.error.should.equal('Invalid verification code');

        const userFromDatabase = await userDAO.get(user._id);
        userFromDatabase.active.should.be.false;
      });

      it('should return an error and the user should remain inactive after receiving an expired code', async () => {
        await emailVerificationCodeDAO.create({
          user: user._id,
          code: '000000',
          expirationTimestamp: DateTime.local().minus({ minutes: 1 }),
        });

        const resp = await http.post('/api/users/verify', {
          userId: user._id,
          code: '000000',
        });

        isNotOk(resp, 400);

        resp.body.error.should.equal('Verification code expired');

        const userFromDatabase = await userDAO.get(user._id);
        userFromDatabase.active.should.be.false;
      });
    });

    describe('re-send email', async () => {
      let user;

      beforeEach(async () => {
        user = await userDAO.create(newUserData);

        await emailVerificationCodeDAO.create({
          user: user._id,
          code: '000000',
          expirationTimestamp: DateTime.local().plus({ minutes: 1 }),
        });
      });

      it('should allow a user to re-send a pre-existing code to the same email', async () => {
        const mock = sinon.mock(global.emailService);

        mock.expects('send').once().withArgs(newUserData.email, 'Clubfinity Email Verification');

        const resp = await http.post('/api/users/resend', { userId: user._id });
        isOk(resp);

        mock.verify();
      });
    });
  });

  describe('With Authentication', async () => {
    let currentUser = null;

    const currentUserParams = {
      name: { first: 'Current', last: 'User' },
      major: 'Computer Science',
      year: 2021,
      email: 'current@user.com',
      password: 'password',
    };

    beforeEach(async () => {
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

        ({ ...newUserData, active: false }).should.deep.equal(expectedUserData);
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

          hasValidationErrors(resp, 'Invalid Club ID. Club does not exist.');
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
});
