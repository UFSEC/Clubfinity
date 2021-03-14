const userDAO = require('../DAO/UserDAO');
const { ValidationError } = require('./errors/validationError');
const { NotFoundError } = require('./errors/notFoundError');

exports.catchErrors = async (res, f) => {
  try {
    const result = await f();
    res.send({ ok: true, data: result });
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(e.httpErrorCode).send({
        ok: false,
        error: e.message,
        validationErrors: e.validationErrors,
      });
    } else if (e instanceof NotFoundError) {
      res.status(e.httpErrorCode).send({ ok: false, error: e.message });
    } else {
      // TODO: We should not catch exceptions that are not input related,
      //       since they should be returned as 500 errors
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
