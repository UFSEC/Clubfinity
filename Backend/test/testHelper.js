exports.TestHttp = class {
  constructor(chai, app, userToken) {
    this.chai = chai;
    this.app = app;
    this.userToken = userToken;
  }

  async get(url) {
    return await this.chai.request(this.app)
      .get(url)
      .auth(this.userToken, { type: 'bearer' })
  }
};

exports.isOk = (response) => {
  response.should.have.status(200);
  response.body.ok.should.be.true;
};

exports.isNotOk = (response, expectedStatus) => {
  response.should.have.status(expectedStatus);
  response.body.ok.should.be.false;
};
