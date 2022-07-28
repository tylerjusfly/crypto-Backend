const jwt = require('jsonwebtoken');
const config = require('../config/config');
const tokenTypes = require('../config/tokenTypes');
const User = require('../models/user.model');
const Token = require('../models/token.model');

/**
 * Parent function for Generating Token
 */

const GenerateToken = (userId, type, secret, expires) => {
  const payload = { sub: userId, type };

  let token = jwt.sign(payload, secret, { expiresIn: expires });

  return token;
};

function ResetPasswordKey(length) {
  let result = '';
  var chars = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

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
 * @desc - Verfication of token
 * @param {String} token
 * @returns {Object}
 */
exports.verifyToken = async (token) => {
  const payload = jwt.verify(token, config.secretKey);

  if (!payload) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'Token not found.'
    };
  }

  return payload;
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

/**
 * @desc Password reset Token
 * @param {String} email- users Email
 */
exports.paswordReset = async (email) => {
  // find user with email
  const user = await User.findOne({ email });

  if (!user) {
    return {
      type: 'Error',
      statusCode: 404,
      message: `No user found with this email ${email}`
    };
  }

  // generate Token
  const ResetToken = ResetPasswordKey(6);
  // save to token database with user
  const saveToken = new Token({
    tokenId: ResetToken,
    userId: user.id,
    type: tokenTypes.RESET_PASSWORD
  });

  await saveToken.save();

  // and return token if email found
  return {
    type: 'Success',
    statusCode: 200,
    message: saveToken
  };
};
