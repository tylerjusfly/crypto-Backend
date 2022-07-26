const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const saltRounds = 10;

/**
 *
 * @desc function to hash users incoming Password
 * @param   { String } password - User password
 */
exports.hashPassword = async (password) => {
  //logger.info('...hashing password');
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    logger.error(error);
    throw new AppError('Unable to hash password', 400);
  }
};

/**
 * @desc Compare hashed password in database to normal password
 * @param {String} userPassword
 * @param {String} databasePassword
 */
exports.compareHashPassword = async (userPassword, databasePassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, databasePassword);

    return isMatch ? true : false;
  } catch (error) {
    logger.error(error);
    throw new AppError('Unable to Compare password', 400);
  }
};
