const app = require('./app');
const logger = require('./utils/logger');
const connectDB = require('../src/config/mongodb');

const PORT = process.env.PORT || 4242;

connectDB();
// declaring app to listen
const server = app.listen(PORT, () => {
  logger.info(`
    ################################################
    The 👨‍🏭 server 🚗 is 🏃‍♀️ running 👡 on ⚓ port 🐹 ${PORT}, 🛒 let's 💅 go 😝 catch 🙀 it! 🍟
    ################################################
`);
});
