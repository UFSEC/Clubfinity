const chai = require('chai');
const chaiHttp = require('chai-http');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');
const authUtil = require('../util/authUtil');
const { TestHttp, isOk, isNotOk } = require('./testHelper');

chai.should();
const app = require('../app');

chai.use(chaiHttp);

const currentUserParams = {
  name: { first: 'Current', last: 'User' },
  major: 'Computer Science',
  year: 2021,
  email: 'current@user.com',
  username: 'currentuser',
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

  describe('GET /user', async () => {
    it('returns all users', async () => {
      const firstUser = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'test@ufl.edu',
        username: 'tester',
        password: 'password123',
      };
      const secondUser = {
        name: { first: 'Jimmy', last: 'John' },
        major: 'Computer Science',
        year: 2021,
        email: 'jimmy@ufl.edu',
        username: 'jimmy',
        password: 'password123',
      };

      await userDAO.create(firstUser);
      await userDAO.create(secondUser);

      const resp = await http.get('/api/user');
      isOk(resp);

      const { data } = resp.body;

      data.should.have.length(3);

      const first = data[1];
      first.should.deep.include(firstUser);
      first.should.include.all.keys('_id', 'clubs');

      const second = data[2];
      second.should.deep.include(secondUser);
      second.should.include.all.keys('_id', 'clubs');
    });
  });

  describe('GET /user/:id', async () => {
    it('returns a single user by id', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'test@ufl.edu',
        username: 'tester',
        password: 'password123',
        clubs: [],
      };

      const user = await userDAO.create(userData);

      const resp = await http.get(`/api/user/${user._id}`);
      isOk(resp);

      resp.body.data.should.deep.include(userData);
    });

    it('returns an error when the id is not found', async () => {
      const resp = await http.get(`/api/user/${fakeId}`);
      isNotOk(resp, 404);

      resp.body.error.should.equal('Id not found');
    });
  });

  describe('POST /user', async () => {
    it('should create a user and return it', async () => {
      const newUserData = {
        name: { first: 'New', last: 'User' },
        major: 'Computer Science',
        year: 2021,
        email: 'new@ufl.edu',
        username: 'newusername',
        password: 'password',
      };

      const resp = await http.post('/api/user', newUserData);
      isOk(resp);

      const { data } = resp.body;
      data.should.deep.include(newUserData);
      data.should.include.all.keys('_id', 'clubs');
    });

    it('should return an error if username is taken', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'test@ufl.edu',
        username: 'testmctester',
        password: 'password123',
      };
      await userDAO.create(userData);

      const resp = await http.post('/api/user', userData);
      isNotOk(resp, 400);

      resp.body.error.should.equal('username already taken');
    });

    it('should return an error if any field is missing', async () => {
      const incompleteUserData = {};

      const resp = await http.post('/api/user', incompleteUserData);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(12);

      errorMessages.should.include.all.members([
        'First name does not exist',
        'Last name does not exist',
        'Year does not exist or is invalid',
        'Major does not exist or is invalid',
        'Email does not exist or is invalid',
        'Username does not exist',
        'Password does not exist',
      ]);
    });

    it('should return an error of either the password or username is too short', async () => {
      const shortUsernameAndPassword = {
        name: { first: 'Jimmy', last: 'John' },
        major: 'Computer Science',
        year: 2021,
        email: 'jimmy@ufl.edu',
        username: 'short',
        password: 'short',
      };

      it('should return an error when there are invalid characters in the name', async () => {
        const invalidCharacter = {
          name: { first: 'Bi7lly', last: 'Johnson' },
          major: 'Accounting',
          year: 2024,
          email: 'billy101@ufl.edu',
          username: 'user3',
          password: 'password12',
        };

        const resp = await http.post('/api/user', invalidCharacter);
        isNotOk(resp, 422);

        resp.body.validationErrors.should.have.length(1);
        resp.body.validationErrors[0].msg.should.equal('Name contains invalid characters');
      });

      const resp = await http.post('/api/user', shortUsernameAndPassword);
      isNotOk(resp, 422);

      const errorMessages = resp.body.validationErrors.map((e) => e.msg);
      errorMessages.should.have.length(2);
      errorMessages.should.include.all.members([
        'Username is too short (less than 6 characters)',
        'Password is too short (less than 6 characters)',
      ]);
    });

    it('should return an error when the username is too long', async () => {
      const longUsername = {
        name: { first: 'Jimmy', last: 'John' },
        major: 'Computer Science',
        year: 2021,
        email: 'jimmy@ufl.edu',
        username: 'thisusernameiswaytoolong',
        password: 'password123',
      };

      const resp = await http.post('/api/user', longUsername);
      isNotOk(resp, 422);

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Username is too long (more than 20 characters)');
    });

    it('should return an error when the username has a space', async () => {
      const spacedUsername = {
        name: { first: 'Jimmy', last: 'John' },
        major: 'Computer Science',
        year: 2021,
        email: 'jimmy@ufl.edu',
        username: 'a username',
        password: 'password123',
      };

      const resp = await http.post('/api/user', spacedUsername);
      isNotOk(resp, 422);

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Username contains a space');
    });

    it('should return an error when the year is incorrectly formatted', async () => {
      const incorrectDateFormat = {
        name: { first: 'Jimmy', last: 'John' },
        year: 'not a year',
        major: 'Computer Science',
        email: 'jimmy@ufl.edu',
        username: 'ausername',
        password: 'password123',
      };

      const resp = await http.post('/api/user', incorrectDateFormat);
      isNotOk(resp, 422);

      resp.body.validationErrors.should.have.length(1);
      resp.body.validationErrors[0].msg.should.equal('Year must be a number');
    });
  });

  describe('PUT /user/:id', async () => {
    it('should update a user and return the updated version', async () => {
      const userData = {
        name: { first: 'Test', last: 'McTester' },
        major: 'Computer Science',
        year: 2021,
        email: 'test@ufl.edu',
        username: 'tester',
        password: 'password123',
      };
      const oldUser = await userDAO.create(userData);

      const newUserData = {
        name: { first: 'DifferentFirst', last: 'DifferentLast' },
        major: 'Computer Science',
        year: 2021,
        email: 'different@ufl.edu',
        username: 'diffusrnme',
        password: 'diffpassword',
      };

      const resp = await http.put(`/api/user/update/${oldUser._id}`, newUserData);
      isOk(resp);

      resp.body.data.should.deep.include(newUserData);
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

    describe('PUT /user/follow/', async () => {
      it('should add a club to the list of followed clubs for the current user', async () => {
        const club = await clubDAO.create(baseClubParams);
        const jsonClub = JSON.parse(JSON.stringify(club));

        const resp = await http.put(`/api/user/follow?clubId=${club._id}`);
        isOk(resp);
        resp.body.data.clubs.should.deep.include(jsonClub);

        // Re-fetch user info to verify that the change persisted
        const userResp = await http.get(`/api/user/${currentUser._id}`);
        userResp.body.data.clubs.should.deep.include(jsonClub);
      });

      it('should do nothing if it is called twice with the same club', async () => {
        const club = await clubDAO.create(baseClubParams);
        const jsonClub = JSON.parse(JSON.stringify(club));

        const resp = await http.put(`/api/user/follow?clubId=${club._id}`);
        isOk(resp);
        resp.body.data.clubs.should.have.length(1);
        resp.body.data.clubs.should.deep.include(jsonClub);

        const resp2 = await http.put(`/api/user/follow?clubId=${club._id}`);
        isOk(resp2);
        resp2.body.data.clubs.should.have.length(1);
        resp2.body.data.clubs.should.deep.include(jsonClub);
      });

      it('should return an error if the clubId does not exist', async () => {
        const resp = await http.put(`/api/user/follow?clubId=${fakeId}`);
        isNotOk(resp, 422);

        resp.body.validationErrors.should.have.length(1);
        resp.body.validationErrors[0].msg.should.equal('Invalid Club ID. Club does not exist.');
      });
    });

    describe('PUT /user/unfollow/:clubId', async () => {
      it('should remove a club from the list of followed clubs for the current user', async () => {
        const club = await clubDAO.create(baseClubParams);
        currentUser.clubs.push(club);
        currentUser.save();

        const resp = await http.put(`/api/user/unfollow?clubId=${club._id}`);
        isOk(resp);
        resp.body.data.clubs.should.be.empty;

        // Re-fetch user info to verify that the change persisted
        const userResp = await http.get(`/api/user/${currentUser._id}`);
        isOk(userResp);
        userResp.body.data.clubs.should.be.empty;
      });

      it('should do nothing if it is called twice with the same club', async () => {
        const { _id: clubId } = await clubDAO.create(baseClubParams);
        currentUser.clubs.push(clubId);
        currentUser.save();

        const resp = await http.put(`/api/user/unfollow?clubId=${clubId}`);
        isOk(resp);
        resp.body.data.clubs.should.be.empty;

        const resp2 = await http.put(`/api/user/unfollow?clubId=${clubId}`);
        isOk(resp2);
        resp2.body.data.clubs.should.be.empty;
      });
    });
  });

  describe('DELETE /user/', async () => {
    it('should delete a user and return it', async () => {
      const resp = await http.delete('/api/user');
      isOk(resp);

      resp.body.data.should.deep.include(currentUserParams);

      const getResp = await http.get(`/api/user/${currentUser._id}`);
      isNotOk(getResp, 404);

      getResp.body.error.should.contain('Id not found');
    });
  });
});
