const formData = require('form-data');
const Mailgun = require('mailgun.js');
const config = require('../Config/config');

exports.EmailService = class {
  constructor() {
    const mailgun = new Mailgun(formData);
    this.client = mailgun.client({
      username: 'api',
      key: config.email.apiKey,
      public_key: config.email.publicKey,
    });
  }

  send(toAddress, subject, body) {
    return this.client.messages.create(config.email.domain, {
      from: config.email.from,
      to: [toAddress],
      subject,
      text: body,
    });
  }
};
