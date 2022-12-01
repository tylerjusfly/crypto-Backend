const nodemailer = require('nodemailer');
const config = require('../config/config');
const AppError = require('../utils/appError');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: config.nodemailer.Email,
    pass: config.nodemailer.Password
  }
});

const link = config.env == 'production' ? 'https://localhost:3000' : 'http://localhost:4242';

//const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}`;

//const SendEmail = ()=>{}

exports.sendVerificationEmail = async (email, token) => {
  try {
    const verificationMail = {
      from: 'Crypto-MarketPlace',
      to: email,
      subject: 'Verification Email',
      html: `<div> 
      <p> Dear User , </p>
      <p> To verify your email, click on this link ${link}/auth/verify/${token} </p>
      If you did not create an account, then ignore this email.
      </div>`
    };

    // Sending Mail
    await transporter.sendMail(verificationMail);
  } catch (error) {
    throw new AppError(error, 404);
  }
};

exports.sendResetTokenEmail = async (email, token) => {
  try {
    const resetMail = {
      from: 'Crypto-MarketPlace',
      to: email,
      subject: 'Password Reset Email',
      html: `<div>
      <p> Dear User , </p>
      <p>You made a request for password reset, Here is your token ${token} </p>
      </div>
      `
    };

    // Sending Mail
    await transporter.sendMail(resetMail);
  } catch (error) {
    throw new AppError(error, 404);
  }
};
