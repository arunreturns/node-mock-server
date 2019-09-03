const { createLogger, format, transports } = require('winston');

const logFormatter = info => {
  const { timestamp, message } = info;
  return `${timestamp} - ${message}`;
};
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize({ all: true }),
    format.printf(logFormatter)
  ),
  transports: [new transports.Console()]
});

module.exports = logger;