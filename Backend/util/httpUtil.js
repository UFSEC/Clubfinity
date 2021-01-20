const userDAO = require('../DAO/UserDAO');
const { ValidationError } = require('./errors/validationError');
const { NotFoundError } = require('./errors/notFoundError');

exports.catchErrors = async (res, f) => {
  try {
    console.log('request recieved....')
    const result = await f();
    console.log('result recieved.. sending ...')
    res.send({ ok: true, data: result });
  } catch (e) {
    console.log('error caught')
    if (e instanceof ValidationError) {
      console.log('validation error')
      res.status(e.httpErrorCode).send({
        ok: false,
        error: e.message,
        validationErrors: e.validationErrors,
      });
    } else if (e instanceof NotFoundError) {
      console.log('not found error')
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      console.log('some other error')
      res.status(400).send({ ok: false, error: e.message });
    }
  }
};

exports.getCurrentUser = async (req) => {
  try {
    return await userDAO.get(req.userId);
  } catch (e) {
    throw new NotFoundError();
  }
};
