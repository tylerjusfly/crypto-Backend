const jwt = require('jsonwebtoken');
const config = require('../config/config');
const tokenTypes = require('../config/tokenTypes');

/**
 * Parent function for Generating Token
 */

const GenerateToken = (userId, type, secret, expires) => {
  const payload = { sub: userId, type };

  let token = jwt.sign(payload, secret, { expiresIn: expires });

  return token;
};

/**
 * Returns Access Token
 * @param {Object} user
 * @returns
 */
exports.AccessToken = async (user) => {
  const AccessToken = GenerateToken(user.id, tokenTypes.ACCESS, config.secretKey, '5d');

  return AccessToken;
};

/**
 * Returns Email Verification Token
 * @param {Object} user
 * @returns
 */
exports.EmailVerifyToken = async (user) => {
  const VerifyEmailToken = GenerateToken(user.id, tokenTypes.VERIFY_EMAIL, config.secretKey, 300);

  return VerifyEmailToken;
};
