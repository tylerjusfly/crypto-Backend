// Packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');
const compression = require('compression');
const xss = require('xss-clean');
const logger = require('morgan');

// Initializing Express
const app = express();

// utils
const errorHandler = require('./utils/errorHandler');

// importing all routes
const allRoutes = require('./routes/main');

/* make sure this comes before any routes */
app.use(xss());
// for nodejs security
app.use(helmet());

// compress all responses
app.use(compression());

// Set Body parser, reading data from body into req.body & Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Implement CORS
app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

// API routes
app.use(allRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

/*
 ** Export App
 */
module.exports = app;
