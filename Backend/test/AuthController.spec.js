const chai = require('chai');
const chaiHttp = require('chai-http');
const { DateTime } = require('luxon');
const sinon = require('sinon');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const announcementDAO = require('../DAO/AnnouncementDAO');
const emailVerificationCodeDAO = require('../DAO/EmailVerificationCodeDAO');
const { TestHttp, isOk, isNotOk } = require('./testHelper');

chai.should();
chai.use(chaiHttp);

const app = require('../app.js');

let http = null;

describe('AuthController', () => {
  beforeEach(async () => {
    global.emailService = { send: () => { } };
    await userDAO.deleteAll();
    await clubDAO.deleteAll();
    await announcementDAO.deleteAll();
    await emailVerificationCodeDAO.deleteAll();

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
      username: 'newusername',
      password: 'password',
  };

  describe('registration', async () => {

    it('should create an inactive user', async () => {
      const resp = await http.post('/auth/register', newUserData);
      isOk(resp);

      const { data } = resp.body;
      const newUserFromDatabase = await userDAO.get(data._id);

      newUserFromDatabase.name.first.should.equal('New');
      newUserFromDatabase.name.last.should.equal('User');
      newUserFromDatabase.active.should.be.false;
    });

    it('should create an email validation code and save it to the database', async () => {
      const resp = await http.post('/auth/register', newUserData);

      const validationCodeRecord = await emailVerificationCodeDAO.get(
        resp.body.data._id,
      );

      validationCodeRecord.should.have.property('code').with.lengthOf(6);
      validationCodeRecord.should.have.property('user');
      validationCodeRecord.should.have.property('expirationTimestamp');
    });

    it('should send an email to the proper recipient', async () => {
      // const fakeEmailService = { send: () => { } };
      const mock = sinon.mock(global.emailService);

      mock.expects('send').once().withArgs(newUserData.email, 'Clubfinity Email Verification');

      // global.emailService = fakeEmailService;

      await http.post('/auth/register', newUserData);

      mock.verify();
    });
  });

  describe('verification', async () => {

    let user;
    beforeEach(async () => {
      user = await userDAO.create(newUserData);
    });

    it('should activate the user after receiving valid code', async () => {
      await emailVerificationCodeDAO.create({user : user._id,
                                             code: "000000",
                                             expirationTimestamp: DateTime.local().plus({ minutes: 1})})

      const resp = await http.post('/auth/verify', {userId : user._id,
                                                    code: "000000"} );

      isOk(resp);

      const userFromDatabase = await userDAO.get(resp.body.data._id);
      userFromDatabase.active.should.be.true;
    });

    it('should return an error and the user should remain inactive after receiving an invalid code', async () => {
      await emailVerificationCodeDAO.create({user : user._id,
                                             code: "000000",
                                             expirationTimestamp: DateTime.local().plus({ minutes: 1})})

      const resp = await http.post('/auth/verify', {userId : user._id,
                                                    code: "999999"} );

      isNotOk(resp, 400);

      resp.body.error.should.equal('Invalid verification code');

      const userFromDatabase = await userDAO.get(user._id);
      userFromDatabase.active.should.be.false;
    });

    it('should return an error and the user should remain inactive after receiving an expired code', async () => {
      await emailVerificationCodeDAO.create({user : user._id,
                                             code: "000000",
                                             expirationTimestamp: DateTime.local().minus({ minutes: 1})})

      const resp = await http.post('/auth/verify', {userId : user._id,
                                                    code: "000000"} );

      isNotOk(resp, 400);

      resp.body.error.should.equal('Verification code expired');

      const userFromDatabase = await userDAO.get(user._id);
      userFromDatabase.active.should.be.false;
    });
  });
});
