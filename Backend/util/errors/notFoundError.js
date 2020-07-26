exports.NotFoundError = class extends Error {
  constructor() {
    super();
    this.message = 'Id not found';
    this.httpErrorCode = 404;
  }
};
