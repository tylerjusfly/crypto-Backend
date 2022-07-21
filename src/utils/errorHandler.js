const logger = require('./logger');
const config = require('../config/config');

// Function That Shows Details About The Error Only on The Development Phase
const sendDevelopmentError = async (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message;
  const stack = err.stack;
  const data = err.data;
  res.status(statusCode).json({ status, message, stack, data });
};

const sendProductionError = async (err, req, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    const status = err.statusCode;

    return res.status(status).json({
      status: err.status,
      message: `${err.message}`
    });
  }

  //else if Programming Error , dont Leak
  //Log Error
  logger.error('ERROR 💥', err);

  return res.status(500).json({
    status: 'error',
    message: `Something went wrong!`
  });
};

const ErrorHandler = async (err, req, res, next) => {
  // Send Errors in The Development Phase
  if (config.env === 'development') {
    sendDevelopmentError(err, req, res);
  } // Else If production mode
  else if (config.env === 'production') {
    let error = { ...err };
    error.message = err.message;

    sendProductionError(error, req, res);
  }
};

module.exports = ErrorHandler;
