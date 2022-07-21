class AppError extends Error {
  constructor(message, statusCode) {
    // inherit message from Error Class
    super(message);

    this.statusCode = statusCode;
    /**
     * If status code starts with 4, return fail , else return error
     */
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
