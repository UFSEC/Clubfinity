exports.ValidationError = class extends Error {
  constructor(validationErrors) {
    super();
    this.message = 'Input validation failure';
    this.validationErrors = validationErrors;
    this.httpErrorCode = 422;
  }
};

exports.NotFoundError = class extends Error {
  constructor() {
    super();
    this.message = 'Id not found';
    this.httpErrorCode = 404;
  }
};
