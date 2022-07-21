const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  // if info is an instance of error
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  // else Just return info
  return info;
});

/// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

module.exports = logger;
