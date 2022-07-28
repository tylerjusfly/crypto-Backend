const { paswordReset } = require('../middlewares/token');
const { sendResetTokenEmail } = require('../nodemailer/nodemailer');
const { signupService, SigninService, verifyEmail } = require('../services/auth.service');
const AppError = require('../utils/appError');

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
    const user = await SigninService(email, password);

    res.send(user);
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

exports.emailVerificationController = async (req, res, next) => {
  const { token } = req.params;
  try {
    const response = await verifyEmail(token);
    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.forgotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resetPassToken = await paswordReset(email);

    await sendResetTokenEmail(email, resetPassToken.tokenId);

    res.status(200).json(resetPassToken);
  } catch (error) {
    return next(new AppError(error, 400));
  }
};
