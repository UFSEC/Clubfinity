const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const userDAO = require("../DAO/UserDAO");
const clubDAO = require("../DAO/ClubDAO");
const announcementDAO = require("../DAO/AnnouncementDAO");
const emailVerificationCodeDAO = require("../DAO/EmailVerificationCodeDAO");
const { EmailService } = require("../Services/EmailService");
const { TestHttp, isOk } = require("./testHelper");

chai.should();
chai.use(chaiHttp);

const app = require("../app.js");
const Sinon = require("sinon");

let http = null;

describe("AuthController", () => {
  beforeEach(async () => {
    await userDAO.deleteAll();
    await clubDAO.deleteAll();
    await announcementDAO.deleteAll();
    await emailVerificationCodeDAO.deleteAll();

    http = new TestHttp(chai, app);
  });

  describe("registration", async () => {
    const newUserData = {
      name: { first: "New", last: "User" },
      major: "Computer Science",
      year: 2021,
      email: "new@ufl.edu",
      username: "newusername",
      password: "password",
    };

    it("should create an inactive user", async () => {
      const resp = await http.post("/auth/register", newUserData);
      isOk(resp);

      const { data } = resp.body;
      const newUserFromDatabase = await userDAO.get(data._id);

      newUserFromDatabase.name.first.should.equal("New");
      newUserFromDatabase.name.last.should.equal("User");
      newUserFromDatabase.active.should.be.false;
    });

    it("should create an email validation code and save it to the database", async () => {
      const resp = await http.post("/auth/register", newUserData);

      const validationCodeRecord = await emailVerificationCodeDAO.get(
        resp.body.data._id
      );

      validationCodeRecord.should.have.property("code").with.lengthOf(6);
      validationCodeRecord.should.have.property("user");
      validationCodeRecord.should.have.property("expirationTimestamp");
    });

    it.only("should send an email to the proper recipient", async () => {
      const mock = sinon.mock(new EmailService());
      mock.expects("send").once();

      global.emailService = mock;

      const resp = await http.post("/auth/register", newUserData);

      mock.verify();
    });
  });
});
