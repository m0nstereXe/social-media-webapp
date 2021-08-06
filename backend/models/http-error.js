class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //add a message prop
    this.code = errorCode;
  }
}

module.exports = HttpError;