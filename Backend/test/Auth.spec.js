const chai = require('chai');
const chaiHttp = require('chai-http');

const userDAO = require('../DAO/UserDAO');
const { TestHttp } = require('./testHelper');

chai.should();

const app = require('../app');

chai.use(chaiHttp);

let http = null;

const userParams = {
  name: { first: 'Current', last: 'User' },
  year: 2021,
  major: 'Computer Science',
  email: 'current@user.com',
  password: 'password',
};

describe('Auth', async () => {
  beforeEach(async () => {
    await userDAO.deleteAll();

    http = new TestHttp(chai, app);
  });

  it('should not allow an inactive user to login', async () => {
    await userDAO.create(userParams);

    const resp = await http.post('/auth/login', {
      email: userParams.email,
      password: userParams.password,
    });

    resp.should.have.status(400);
    resp.body.error.should.equal('User is not active');
  });
});
