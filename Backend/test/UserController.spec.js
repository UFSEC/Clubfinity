process.env.NODE_ENV = 'test';

const userDAO = require('../DAO/UserDAO');
const chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
const app = require('../app');

chai.use(chaiHttp);

describe('Users', () => {

  beforeEach(async () => {
    await userDAO.deleteAll();
  });

  describe('GET /user', async () => {
    it('returns all users', async () => {
      const firstUser = {
        name: { first: 'Test', last: 'McTester' },
        dob: '2019-01-01',
        email: 'test@test.com',
        username: 'tester',
        password: 'password123'
      };
      const secondUser = {
        name: { first: 'Jimmy', last: 'John' },
        dob: '2000-02-02',
        email: 'jimmy@john.com',
        username: 'jimmy',
        password: 'password123'
      };

      await userDAO.create(firstUser);
      await userDAO.create(secondUser);

      const resp = await chai.request(app)
        .get('/api/user')
        .send();

      resp.should.have.status(200);
      resp.body.ok.should.be.true;

      const data = resp.body.data;

      data.should.have.length(2);

      const first = data[0];
      first.should.deep.include(firstUser);
      first.should.include.all.keys('_id', 'clubs');

      const second = data[1];
      second.should.deep.include(secondUser);
      second.should.include.all.keys('_id', 'clubs');
    });
  });

  describe('GET /user/:id', async () => {
    it('returns a single user by id', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        dob: '2019-01-01',
        email: 'test@test.com',
        username: 'tester',
        password: 'password123'
      };

      const user = await userDAO.create(userData);

      const resp = await chai.request(app)
        .get(`/api/user/${user._id}`)
        .send();

      resp.should.have.status(200);
      resp.body.ok.should.be.true;

      resp.body.data.should.deep.include(userData);
    });

    it('returns an error when the id is not found', async () => {
      const resp = await chai.request(app)
        .get('/api/user/5dba404f70edd5146e98492b')
        .send();

      resp.should.have.status(404);
      resp.body.ok.should.be.false;
      resp.body.error.should.equal('Id not found');
    })
  });

  describe('POST /user', async () => {
    it('should create a user and return it', async () => {
      const newUserData = {
        name: { first: 'New', last: 'User' },
        dob: '2000-01-01',
        email: 'new@user.com',
        username: 'newusername',
        password: 'password'
      };

      const resp = await chai.request(app)
        .post('/api/user')
        .send(newUserData);
      resp.should.have.status(200);


      const body = resp.body;
      body.ok.should.be.true;
      body.data.should.deep.include(newUserData);
      body.data.should.include.all.keys('_id', 'clubs');
    });

    it('should return an error if username is taken', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        dob: '2019-01-01',
        email: 'test@test.com',
        username: 'testmctester',
        password: 'password123'
      };

      await userDAO.create(userData);

      const resp = await chai.request(app)
        .post('/api/user')
        .send(userData);

      resp.should.have.status(400);
      resp.body.ok.should.be.false;
      resp.body.error.should.equal('username already taken')
    });

    it('should return an error if any field is missing', async () => {
      const incompleteUserData = {};

      const resp = await chai.request(app)
        .post('/api/user')
        .send(incompleteUserData);

      resp.should.have.status(422);
      resp.body.ok.should.be.false;

      const errorMessages = resp.body.validationErrors.map(e => e.msg);
      errorMessages.should.have.length(10);
      errorMessages.should.include.all.members([
        'First name does not exist',
        'Last name does not exist',
        'Date of birth does not exist',
        'Invalid date string',
        'Email does not exist or is invalid',
        'Username does not exist',
        'Password does not exist'
      ])
    });

    it('should return an error of either the password or username is too short', async () => {
      const shortUsernameAndPassword = {
        name: { first: 'Jimmy', last: 'John' },
        dob: '2000-02-02',
        email: 'jimmy@john.com',
        username: 'short',
        password: 'short'
      };

      const resp = await chai.request(app)
        .post('/api/user')
        .send(shortUsernameAndPassword);

      resp.should.have.status(422);
      resp.body.ok.should.be.false;

      const errorMessages = resp.body.validationErrors.map(e => e.msg);
      errorMessages.should.have.length(2);
      errorMessages.should.include.all.members([
        'Username is too short (less than 6 characters)',
        'Password is too short (less than 6 characters)'
      ])
    });

    it('should return an error when the username is too long', async () => {
      const longUsername = {
        name: { first: 'Jimmy', last: 'John' },
        dob: '2000-02-02',
        email: 'jimmy@john.com',
        username: 'thisusernameiswaytoolong',
        password: 'password123'
      };

      const resp = await chai.request(app)
        .post('/api/user')
        .send(longUsername);

      resp.should.have.status(422);
      resp.body.ok.should.be.false;

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Username is too long (more than 20 characters)');
    });

    it('should return an error when the username has a space', async () => {
      const spacedUsername = {
        name: { first: 'Jimmy', last: 'John' },
        dob: '2000-02-02',
        email: 'jimmy@john.com',
        username: 'a username',
        password: 'password123'
      };

      const resp = await chai.request(app)
        .post('/api/user')
        .send(spacedUsername);

      resp.should.have.status(422);
      resp.body.ok.should.be.false;

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Username contains a space');
    });

    it('should return an error when the dob is incorrectly formatted', async () => {
      const incorrectDateFormat = {
        name: { first: 'Jimmy', last: 'John' },
        dob: '2000-0202',
        email: 'jimmy@john.com',
        username: 'ausername',
        password: 'password123'
      };

      const resp = await chai.request(app)
        .post('/api/user')
        .send(incorrectDateFormat);

      resp.should.have.status(422);
      resp.body.ok.should.be.false;

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Invalid date string');
    });
  });

  describe('PUT /user/:id', async () => {
    it('should update a user and return the updated version', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        dob: '2019-01-01',
        email: 'test@test.com',
        username: 'tester',
        password: 'password123'
      };
      const oldUser = await userDAO.create(userData);

      const newUserData = {
        name: { first: 'DifferentFirst', last: 'DifferentLast' },
        dob: '2019-02-02',
        email: 'different@different.com',
        username: 'diffusrnme',
        password: 'diffpassword'
      };

      const resp = await chai.request(app)
        .put(`/api/user/${oldUser._id}`)
        .send(newUserData);

      resp.should.have.status(200);
      resp.body.ok.should.be.true;

      resp.body.data.should.deep.include(newUserData);
    });
  });

  describe('DELETE /user/:id', async () => {
    it('should delete a user and return it', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        dob: '2019-01-01',
        email: 'test@test.com',
        username: 'tester',
        password: 'password123'
      };

      const user = await userDAO.create(userData);

      const resp = await chai.request(app)
        .delete(`/api/user/${user._id}`)
        .send();

      resp.should.have.status(200);
      resp.body.ok.should.be.true;

      resp.body.data.should.deep.include(userData);
    });

    it('should return an error when the id does not exist', async () => {
      const resp = await chai.request(app)
        .delete('/api/user/5dba44f05b88ed1602589e84')
        .send();

      resp.should.have.status(404);
      resp.body.ok.should.be.false;
      resp.body.error.should.equal('Id not found');
    });
  });
});
