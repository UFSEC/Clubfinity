exports.ValidationError = class extends Error {
  constructor(validationErrors) {
    super();
    this.message = 'Input validation failure';
    this.validationErrors = validationErrors;
    this.httpErrorCode = 422;
  }
};
