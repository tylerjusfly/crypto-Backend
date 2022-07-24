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
      <p> To verify your email, click on this link ${link}/${token} </p>
      If you did not create an account, then ignore this email.
      </div>`
    };

    // Sending Mail
    await transporter.sendMail(verificationMail);
  } catch (error) {
    throw new AppError(error, 404);
  }
};

// const registerMail = {
//   from: "admin.AnyBuy",
//   to: email,
//   subject: "Your Admin Login",
//   html: `<div>
//   <p> Congratulations, You have Been Added As An Admin </p>
//   <p> You can login with your email <h2> ${email}</h2> and Password <h2> ${autoPassword} </h2> </p>
//   Please do not lose this credentials.
//   </div>`,
// };
