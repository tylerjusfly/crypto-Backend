const express = require('express');
const router = express.Router();

// Import all routes
const userRoute = require('./users');

router.use('/', userRoute);

module.exports = router;
