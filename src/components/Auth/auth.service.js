const { hashPassword, compareHashPassword } = require('../../middlewares/password');
const { AccessToken, EmailVerifyToken, verifyToken } = require('../../middlewares/token');
const User = require('../Users/user.model');
const Token = require('../Tokens/token.model');
const { sendVerificationEmail } = require('../../nodemailer/nodemailer');
const tokenTypes = require('../../config/tokenTypes');

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
  const accessToken = await AccessToken(user);
  // Email verification token expires in 5 mins
  const verificationToken = await EmailVerifyToken(user);
  // Send verification email
  await sendVerificationEmail(email, verificationToken);
  //   excludinng password when sending User details
  user.password = undefined;

  return {
    type: 'Success',
    user,
    tokens: { accessToken, verificationToken }
  };
};

/**
 * @desc -Signin Service
 * @param   { String } email - User email address
 * @param   { String } password - User password
 */
exports.SigninService = async (email, password) => {
  // Check if email and password Exist
  if (!email || !password) {
    return {
      statusCode: 400,
      message: 'email Or PasswordRequired'
    };
  }

  // Get user From database
  const user = await User.findOne({ email });

  //Check if user does not exist
  if (!user) {
    return {
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  const isMatch = await compareHashPassword(password, user.password);

  if (!isMatch) {
    return {
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  // Generate AccessToken
  const accessToken = await AccessToken(user);

  //If everything ok, send data
  return {
    statusCode: 200,
    user,
    message: accessToken
  };
};

/**
 *
 * @param {String} verifyEmailToken
 * @desc - Verification of email
 */

exports.verifyEmail = async (verifyEmailToken) => {
  //@todo , verify email token should not expire
  const userToken = await verifyToken(verifyEmailToken);

  const user = await User.findById(userToken.sub);

  // if user Dont  exist
  if (!user) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noUserFound'
    };
  }

  // else update user status To is verified
  await User.findByIdAndUpdate(user.id, { isEmailVerified: true });

  // Email verification success
  return {
    type: 'Sucess',
    statusCode: 200,
    message: 'successfulEmailVerification'
  };
};

exports.ResetPassword = async (token, password, confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      type: 'Error',
      statusCode: 400,
      message: 'password Does not match'
    };
  }

  // else find if token in database
  const Istoken = await Token.findOne({ tokenId: token });

  if (!Istoken) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'Invalid Token'
    };
  }

  // if true , get user id , check if user exist
  const user = await User.findById(Istoken.userId);

  if (!user) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'User Not Found'
    };
  }
  // if true , hash users password , and save
  password = await hashPassword(password);

  user.password = password;

  // save user document
  await user.save();

  // delete token from database
  await Token.deleteMany({ userId: user.id, type: tokenTypes.RESET_PASSWORD });

  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulPasswordChange'
  };
};
