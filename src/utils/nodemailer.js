const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: config.nodemailer.Email,
    pass: config.nodemailer.Password
  }
});
module.exports = transporter;
