const express = require('express');
const router = express.Router();

// Import all routes
const userRoute = require('./users.routes');
const authRoute = require('./auth.routes');
const productRoute = require('./product.routes');

router.use('/', userRoute);
router.use('/auth', authRoute);
router.use('/product', productRoute);

module.exports = router;
