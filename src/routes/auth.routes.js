const express = require('express');
const router = express.Router();
const { signupController, signinController, emailVerificationController } = require('../controllers/auth');

router.post('/signup', signupController);

router.post('/signin', signinController);

router.post('/verify/:token', emailVerificationController);

module.exports = router;
