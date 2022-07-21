const express = require('express');
const router = express.Router();
const config = require('../config/config');
const AppError = require('../utils/appError');

router.get('/', (req, res, next) => {
  try {
    res.json('hello world');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
