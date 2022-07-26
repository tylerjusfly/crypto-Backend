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
    res.send(response);
  } catch (error) {
    return next(error);
  }
};
