const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: 'production',
  db: {
    url: process.env.url
  }
};

module.exports = config;
