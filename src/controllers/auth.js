const { signupService } = require('../services/auth.service');

exports.signupController = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
