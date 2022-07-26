const express = require('express');
const router = express.Router();

// Import all routes
const userRoute = require('./users.routes');
const authRoute = require('./auth.routes');

router.use('/', userRoute);
router.use('/auth', authRoute);

module.exports = router;
