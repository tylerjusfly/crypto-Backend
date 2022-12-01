const express = require('express');
const router = express.Router();
const {
  signupController,
  signinController,
  emailVerificationController,
  forgotPasswordController,
  resetPasswordController
} = require('../components/Auth/auth.controller');

router.post('/signup', signupController);

router.post('/signin', signinController);

router.get('/verify/:token', emailVerificationController);

router.post('/forgot-password', forgotPasswordController);

router.post('/change-password', resetPasswordController);

module.exports = router;
