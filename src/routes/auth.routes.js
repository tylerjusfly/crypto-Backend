const express = require('express');
const router = express.Router();
const {
  signupController,
  signinController,
  emailVerificationController,
  forgotPasswordController
} = require('../controllers/auth');

router.post('/signup', signupController);

router.post('/signin', signinController);

router.get('/verify/:token', emailVerificationController);

router.post('/forgot-password', forgotPasswordController);

module.exports = router;
