const { paswordReset } = require('../../middlewares/token');
const { sendResetTokenEmail } = require('../../nodemailer/nodemailer');
const { signupService, SigninService, verifyEmail, ResetPassword } = require('./auth.service');
const AppError = require('../../utils/appError');

exports.signupController = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    res.status(201).json(user);
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

exports.signinController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { statusCode, message, user } = await SigninService(email, password);

    res.status(statusCode).json({
      message,
      user
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

exports.emailVerificationController = async (req, res, next) => {
  const { token } = req.params;
  try {
    const { type, statusCode, message } = await verifyEmail(token);

    res.status(statusCode).json({
      type,
      message
    });
  } catch (error) {
    return next(error);
  }
};

exports.forgotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { type, statusCode, message } = await paswordReset(email);

    await sendResetTokenEmail(email, message.tokenId);

    res.status(statusCode).json({
      type,
      message
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

exports.resetPasswordController = async (req, res, next) => {
  const { token, password, confirmpass } = req.body;

  try {
    const { type, statusCode, message } = await ResetPassword(token, password, confirmpass);

    res.status(statusCode).json({
      type,
      message
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};
