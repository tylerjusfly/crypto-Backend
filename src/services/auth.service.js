const { hashPassword } = require('../middlewares/password');
const { GenerateToken } = require('../middlewares/token');
const tokenTypes = require('../config/tokenTypes');
const User = require('../models/user.model');
const config = require('../config/config');

exports.signupService = async (body) => {
  const { name, username, email, role, wallet } = body;
  let { phone, password } = body;

  //   check phone field if empty
  if (!phone) phone = '';

  if (!name || !username || !email || !password) {
    return {
      type: 'Error',
      message: 'all Fields Required',
      statusCode: 400
    };
  }

  //   check if password length is < 8
  if (password.length < 8) {
    return {
      type: 'Error',
      message: 'passwordLength',
      statusCode: 400
    };
  }

  // 4) Make admin role forbidden
  if (!['user'].includes(role)) {
    return {
      type: 'Error',
      message: 'roleRestriction',
      statusCode: 400
    };
  }

  //   make creation of wallet funding forbidden at creation
  if (wallet) {
    return {
      type: 'Error',
      message: 'walletFundingRestriction',
      statusCode: 400
    };
  }

  //Check if the email already taken
  const isEmailTaken = await User.emailAlreadyExists(email);

  if (isEmailTaken) {
    return {
      type: 'Error',
      message: 'emailTaken',
      statusCode: 409
    };
  }

  //Check if username already taken
  const isUsernameTaken = await User.usernameAlreadyExists(username);

  if (isUsernameTaken) {
    return {
      type: 'Error',
      message: 'userNameTaken',
      statusCode: 409
    };
  }

  //Overwriting password to hash Password
  password = await hashPassword(password);

  //   Create account
  const user = new User({
    name,
    email,
    username,
    password,
    role,
    phone
  });

  await user.save();

  // Generate AccessToken
  const accessToken = GenerateToken(user.id, tokenTypes.ACCESS, config.secretKey, '5d');
  // Email verification token expires in 5 mins
  const verificationToken = GenerateToken(user.id, tokenTypes.VERIFY_EMAIL, config.secretKey, 300);

  //   excludinng password when sending User details
  user.password = undefined;

  return {
    type: 'Success',
    user,
    tokens: { accessToken, verificationToken }
  };
};
