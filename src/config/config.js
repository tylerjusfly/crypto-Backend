const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: 'production',
  db: {
    url: process.env.url
  },
  nodemailer: {
    Email: process.env.nodeMailer_Email,
    Password: process.env.nodeMailer_Password
  },
  secretKey: process.env.Jwt_Secret
};

module.exports = config;
