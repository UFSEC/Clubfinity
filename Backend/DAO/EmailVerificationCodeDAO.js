const EmailVerificationCode = require('../Model/EmailVerificationCode').Model;
const { NotFoundError } = require('../util/errors/notFoundError');

exports.create = async (params) => new EmailVerificationCode(params).save();

exports.get = async (userId) => {
  const code = await EmailVerificationCode.findOne({ user: userId });

  if (!code) throw new NotFoundError();

  return code;
};

exports.deleteAll = async () => {
  await EmailVerificationCode.deleteMany();
};
