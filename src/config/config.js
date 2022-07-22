const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: 'development',
  db: {
    url: process.env.url
  }
};

module.exports = config;
