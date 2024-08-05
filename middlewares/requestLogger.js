const fs = require('fs');

const generateTimestamp = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return date + "--" + hours + ":" + minutes;
};

const logRequest = (req, res, next) => {
  const logEntry = `${generateTimestamp()} - ${req.method} - ${req.url}\n`;
  fs.appendFileSync('logs/requests.log', logEntry);
  next();
};

module.exports = logRequest;
